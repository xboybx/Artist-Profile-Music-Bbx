const express = require('express');
const router = express.Router();
const YoutubeVideo = require('../models/YoutubeVideo');

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await YoutubeVideo.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a video
router.post('/', async (req, res) => {
  const video = new YoutubeVideo({
    url: req.body.url,
    embedUrl: req.body.embedUrl,
    thumbnailUrl: req.body.thumbnailUrl,
    videoId: req.body.videoId
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a video
router.delete('/:id', async (req, res) => {
  try {
    const video = await YoutubeVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await video.deleteOne();
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;