import {
  createPlaylist,
  getAllTracksInPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
import { getTrackById } from "#db/queries/tracks";
import { createPlaylistsTracksRow } from "#db/queries/playlists_tracks";
import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  if (!req.body.name || !req.body.description) {
    return res.status(400).send("Request body is missing required fields");
  }
  const playlist = await createPlaylist(req.body);
  return res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  if (isNaN(Number(id))) {
    return res.status(400).send();
  }
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found");
  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  const playlist = await getPlaylistById(req.playlist.id);
  res.send(playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const playlist = await getAllTracksInPlaylist(req.playlist.id);
  res.send(playlist);
});

router.post("/:id/tracks", async (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  const { trackId } = req.body;
  if (!trackId) {
    return res.status(400).send();
  }
  if (isNaN(Number(trackId))) {
    return res.status(400).send();
  }
  const track = await getTrackById(trackId);
  if (!track) {
    return res.status(400).send();
  }
  const tracks = await getAllTracksInPlaylist(req.playlist.id);
  if (tracks.find((track) => track.id === trackId)) {
    return res.status(400).send("Track is already in playlist");
  }
  const playlist_track = await createPlaylistsTracksRow(
    req.playlist.id,
    trackId,
  );
  res.status(201).send(playlist_track);
});
