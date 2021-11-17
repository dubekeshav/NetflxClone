const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    mainPageImg: { type: String },
    titleIcon: { type: String },
    listImg: { type: String },
    trailer: { type: String },
    movie: { type: String },
    year: { type: String },
    genre: { type: String },
    ageLimit: { type: Number },
    isSeries: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.export = mongoose.model("Movie", MovieSchema);
