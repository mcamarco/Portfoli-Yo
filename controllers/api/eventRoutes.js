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
router.put("/:event", passwordAuth, async (req, res) => {
  try {
      const newEvent = await Event.update(
          {
              eventName: req.body.eventName,
              eventLocation: req.body.eventLocation, 
              eventIndustry: req.body.eventIndustry,
              aboutEvent: req.body.aboutEvent 
          },
          {
              where: {
                  id: req.params.event
              }
          }
      )
      res.status(200).json(updatedEvent)
  } catch (err) {
      res.status(400).json(err)
  }
})

//Route for deleting an event
router.delete("/:event", passwordAuth, async (req, res) => {
  try {
      const eventData = await Event.destroy({
          where: {
              id: req.params.event
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
