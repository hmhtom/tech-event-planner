const router = require("express").Router();
const { Event } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const eventData = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      user_id: req.session.user_id,
      category_id: req.body.category_id,
    });
    res.status(200).json(eventData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.update(
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(eventData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(eventData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
