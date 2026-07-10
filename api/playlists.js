import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
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
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found");
  req.playlist = playlist;
  next();
});
