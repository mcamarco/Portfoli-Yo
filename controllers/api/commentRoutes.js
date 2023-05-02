const router = require('express').Router();
const { Comment } = require('../models/');
const withAuth = require('../utils/passwordAuth');

// Route for deleting a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Find the comment to be deleted by its id
    const commentData = await Comment.findByPk(req.params.id);

    // Check if the comment exists
    if (!commentData) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    // Check if the current user is the creator of the comment
    if (commentData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this comment' });
      return;
    }

    // Delete the comment
    await commentData.destroy();

    res.status(200).json({ message: 'Comment successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route for creating a new comment
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    // Create a new comment with the current user ID as the author
    const newComment = await Comment.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
