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
      type: Number,
      required: true,
    },
    embedcolor: {
      type: String,
      required: false,
      default: "#2f3136",
    },
    badges: {
      type: Array,
      required: false,
      default: []
    }
},
  { timestamps: true }
);

module.exports = model("userschema", userschema);
