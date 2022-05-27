const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    },
    likes: {
      type: Array,
      required: false,
      default: []
    },
    views: {
      type: Number,
      required: false,
      default: 0
    },
    occupation: {
      type: String,
      required: false,
      default: 'Unemployed'
    },
    links: {
      github: {
        type: String,
        required: false,
        default: 'none'
      },
      instagram: {
        type: String,
        required: false,
        default: 'none'
      },
      linkedin: {
        type: String,
        required: false,
        default: 'none'
      },
      twitch: {
        type: String,
        required: false,
        default: 'none'
      },
      youtube: {
        type: String,
        required: false,
        default: 'none'
      },
      twitter: {
        type: String,
        required: false,
        default: 'none'
      },
      customwebsite: {
        type: String,
        required: false,
        default: 'none'
      }
    },
    projects: {
      type: Array,
      required: false,
      default: []
    }
},
  { timestamps: true }
);

const User = mongoose.model('userschema', userschema);
module.exports = User;
