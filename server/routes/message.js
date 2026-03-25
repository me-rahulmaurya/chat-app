const express = require('express');
const Message = require('../models/Message');
const protect = require('../middleware/protect');

const router = express.Router();

router.post('/send/:id', protect, async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    if (!message) {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json(newMessage);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;