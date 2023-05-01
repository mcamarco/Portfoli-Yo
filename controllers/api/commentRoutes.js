const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// Route for getting all comments for a post
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all comment data, including the user who made the comment
    const commentData = await Comment.findAll({
      include: [User],
    });
    // Serialize the comment data to an array of plain objects
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Render the single-post handlebars template with the comments and logged in status
    res.render('single-post', { comments, loggedIn: req.session.loggedIn });
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
