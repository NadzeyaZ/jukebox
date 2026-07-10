import { getTrackById, getTracks } from "#db/queries/tracks";
import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  return res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).send();
  }
  const track = await getTrackById(id);
  if (!track) {
    return res.status(404).send();
  }
  return res.send(track);
});
