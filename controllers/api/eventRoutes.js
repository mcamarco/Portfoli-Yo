const router = require('express').Router();
const { Event } = require('../../models/');
const passwordAuth = require('../../utils/passwordAuth');


// Route for creating a new event
router.post('/', passwordAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.session.username
      }
    })
    const userId = user.id

    const newEvent = await Event.create({
      location: req.body.location,
      eventName: req.body.eventName,
      eventDescription: req.body.eventDescription,
      industry: req.body.industry,
      userId: userId
    })

    res.status(200).json(newEvent)

  } catch (err) {
    res.status(500).json(err);
  }
});

//Route for updating an event
router.put("/:id", passwordAuth, async (req, res) => {
  try {
    const updatedEvent = await Event.update(
      {
        location: req.body.location,
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        industry: req.body.industry,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(updatedEvent)
  } catch (err) {
    res.status(400).json(err)
  }
})

//Route for deleting an event
router.delete("/:id", passwordAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!eventData) {
      res.status(404).json({ message: "No event found" })
      return
    }
    res.status(200).json(eventData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
