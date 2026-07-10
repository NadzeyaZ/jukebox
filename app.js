import express from "express";
import morgan from "morgan";
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

const app = express();
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }

  // TODO

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
