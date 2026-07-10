import db from "#db/client";

export async function createPlaylist({ name, description }) {
  const sql = `
    INSERT INTO playlists
        (name, description)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
  SELECT * FROM playlists
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT * FROM playlists WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getAllTracksInPlaylist(id) {
  const sql = `
  SELECT tracks.* 
  FROM playlists_tracks
    JOIN playlists ON playlists.id = playlist_id
    JOIN tracks ON tracks.id = track_id 
  WHERE playlist_id = $1 
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}
