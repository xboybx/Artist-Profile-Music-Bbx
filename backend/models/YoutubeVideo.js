const mongoose = require('mongoose');

const youtubeVideoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  embedUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('YoutubeVideo', youtubeVideoSchema);