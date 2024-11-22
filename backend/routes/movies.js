const router = require("express").Router();
const verify = require("../verifyToken");
const Movie = require("../models/Movie");

//----------------------CREATE MOVIE METHOD--------------
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json(
        "You are not allowed to carry out this operation to create a new movie."
      );
  }
});

//----------------------UPDATE MOVIE METHOD--------------

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update movie details.");
  }
});

//----------------------DELETE MOVIE METHOD--------------

router.delete("/delete/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("The movie has been deleted.....");
  } else {
    res.status(403).json("You are not allowed to delete the movie.");
  }
});

//----------------------GET ALL MOVIES & SERIES METHOD--------------

router.get("/", verify, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//----------------------GET MOVIE BY ID METHOD--------------

router.get("/movie/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//----------------------GET RANDOM MOVIE/SERIES METHOD-----------------------

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;

  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: true },
        },
        {
          $sample: {
            size: 1,
          },
        },
      ]);
    } else {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: false },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
