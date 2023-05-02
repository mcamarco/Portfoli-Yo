const router = require('express').Router();
const { Comment, User, Event } = require('../../models');
const passwordAuth = require('../../utils/passwordAuth');

// Route for deleting a comment
router.delete('/:id', passwordAuth, async (req, res) => {
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
router.post('/:id', passwordAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.session.username
      }
    })
    const userId = user.id
    console.log(userId)

    const event = await Event.findOne({
      where: {
        id: req.params.id
      }
    })
    const eventId = event.id
    console.log(eventId)

    const newComment = await Comment.create({
      content: req.body.content,
      userId: userId,
      eventId: eventId
    })

    res.status(200).json(newComment)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
