import { Request, Response } from "express";
import Movie from "../models/movie";

export async function addMovie(req: Request, res: Response): Promise<void> {
  const { title, imdb_id, poster, genre, year } = req.body as {
    title?: string;
    imdb_id?: string;
    poster?: string;
    genre?: string;
    year?: string;
  };

  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }

  const movie = await Movie.create({
    userId: req.user!.id,
    title,
    imdbId: imdb_id ?? null,
    poster: poster ?? null,
    year: year ?? null,
    genre: genre ?? null,
    status: "want_to_watch",
  });

  res.status(201).json({ movie });
}

export async function getMovies(req: Request, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { status } = req.query as { status?: string };

  const where: Record<string, unknown> = { userId };
  if (status === "watched" || status === "want_to_watch") {
    where["status"] = status;
  }

  const movies = await Movie.findAll({
    where,
    order: [["addedAt", "DESC"]],
  });

  res.json({ movies });
}

export async function updateMovie(req: Request, res: Response): Promise<void> {
  const movieId = Number.parseInt(String(req.params["id"] ?? ""), 10);
  const userId = req.user!.id;

  const movie = await Movie.findByPk(movieId);

  if (!movie) {
    res.status(404).json({ error: "Movie not found" });
    return;
  }

  if (movie.userId !== userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const { rating, review, status } = req.body as {
    rating?: number;
    review?: string;
    status?: "want_to_watch" | "watched";
  };

  // validate rating
  if (
    rating !== undefined &&
    (typeof rating !== "number" || rating < 1 || rating > 5)
  ) {
    res.status(400).json({ error: "rating must be a number between 1 and 5" });
    return;
  }

  // validate status
  if (status !== undefined && !["want_to_watch", "watched"].includes(status)) {
    res.status(400).json({ error: "status must be want_to_watch or watched" });
    return;
  }

  if (rating !== undefined) movie.rating = rating;
  if (review !== undefined) movie.review = review;
  if (status !== undefined) movie.status = status;

  console.log("Saving movie with updated values:", movie.toJSON());
  await movie.save();

  res.json({ movie });
}

export async function deleteMovie(req: Request, res: Response): Promise<void> {
  const movieId = Number.parseInt(String(req.params["id"] ?? ""), 10);
  const userId = req.user!.id;

  const movie = await Movie.findByPk(movieId);

  if (!movie) {
    res.status(404).json({ error: "Movie not found" });
    return;
  }

  if (movie.userId !== userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  await movie.destroy();

  res.json({ message: "Deleted" });
}
