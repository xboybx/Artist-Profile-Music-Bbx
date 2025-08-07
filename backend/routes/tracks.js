const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a track
router.post('/', async (req, res) => {
  const track = new Track({
    name: req.body.name,
    spotifyEmbed: req.body.spotifyEmbed,
    spotifyUrl: req.body.spotifyUrl,
    appleMusicUrl: req.body.appleMusicUrl,
    youtubeMusicUrl: req.body.youtubeMusicUrl,
    songUrl: req.body.songUrl,
    imageUrl: req.body.imageUrl
  });

  try {
    const newTrack = await track.save();
    res.status(201).json(newTrack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a track
router.put('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    Object.assign(track, req.body);
    const updatedTrack = await track.save();
    res.json(updatedTrack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a track
router.delete('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    await track.deleteOne();
    res.json({ message: 'Track deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;