import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistsTracksRow } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 1; i <= 20; i++) {
    const name = "Track " + i;
    const durationMs = faker.number.int({ min: 200000, max: 500000 });
    await createTrack(name, durationMs);
  }

  for (let i = 1; i <= 10; i++) {
    const name = "Playlist " + i;
    const description = faker.lorem.sentence();
    await createPlaylist(name, description);
  }

  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(Math.random() * 10);
    const trackId = 1 + Math.floor(Math.random() * 20);
    await createPlaylistsTracksRow(playlistId, trackId);
  }
}
