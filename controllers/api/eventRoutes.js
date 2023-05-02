const router = require('express').Router();
const { event } = require('../../models/');
const withAuth = require('../../utils/passwordAuth');

// Route for getting all events
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all event data, including the user who made the comment
    const eventData = await event.findAll({
      include: [User],
    });
    // Serialize the event data to an array of plain objects
    const events = eventData.map((event) => event.get({ plain: true }));

    // Render the single-post handlebars template with the events and logged in status
    res.render('single-post', { events, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for creating a new event
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    // Create a new comment with the current user ID as the author
    const newEvent = await event.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
