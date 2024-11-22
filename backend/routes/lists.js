const router = require("express").Router();
const verify = require("../verifyToken");
const List = require("../models/List");

//-------------------CREATE ITEM LIST METHOD---------------
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You don't have the authority to create a list");
  }
});

//-------------------UPDATE ITEM LIST METHOD---------------

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You don't have the authority to update this.");
  }
});

//-------------------DELETE ITEM LIST METHOD---------------
router.delete("/delete/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("The list has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You  are not authorized to delete any list.");
  }
});

//-------------------GET ALL ITEM LISTS METHOD---------------
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//-------------------GET ITEM LIST BY ID METHOD---------------
router.get("/:id", verify, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
