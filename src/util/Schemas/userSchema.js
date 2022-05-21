const { Schema, model } = require("mongoose");

const userschema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "This user has no description yet!",
    },
    userSince: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("userschema", userschema);
