const router = require('express').Router();
const { Event } = require('../../models/');
const passwordAuth = require('../../utils/passwordAuth');


// Route for creating a new event
router.post('/', passwordAuth, async (req, res) => {
  const body = req.body;

  try {
    // Create a new comment with the current user ID as the author
    const newEvent = await Event.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route for updating an event

//Route for deleting an event

module.exports = router;
