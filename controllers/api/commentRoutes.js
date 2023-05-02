const router = require('express').Router();
const { Comment } = require('../../models/');
const passwordAuth = require('../../utils/passwordAuth');

// Route for creating a new comment
router.post('/', passwordAuth, async (req, res) => {
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

//Route for deleting a comment 

module.exports = router;
