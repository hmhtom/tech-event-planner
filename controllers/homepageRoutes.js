const router = require("express").Router();
const { User, Category, Event, Participant } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", async (req, res) => {
  try {
    let eventData;
    if (req.query.category_id) {
      req.query.page
        ? (eventData = await Event.findAll({
            where: {
              category_id: req.query.category_id,
            },
            limit: 5,
            offset: (parseInt(req.query.page) - 1) * 5,
          }))
        : (eventData = await Event.findAll({
            where: {
              category_id: req.query.category_id,
            },
            limit: 5,
          }));
    } else {
      req.query.page
        ? (eventData = await Event.findAll({
            limit: 5,
            offset: (parseInt(req.query.page) - 1) * 5,
          }))
        : (eventData = await Event.findAll({
            limit: 5,
          }));
    }
    const events = eventData.map((event) => event.get({ plain: true }));

    const categoryData = await Category.findAll();

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    res.render("homepage", {
      events,
      categories,
      current_user_id: req.session.user_id,
      current_username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.current_user_id, {
      include: [{ model: Event }, { model: Participant, include: Event }],
    });
    const user = userData.get({ plain: true });
    res.render("dashboard", {
      ...user,
      current_user_id: req.session.user_id,
      current_username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("event/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [{ model: User }, { model: Participant }, { model: Category }],
    });
    const event = eventData.get({ plain: ture });
    res.render("event", {
      ...event,
      current_user_id: req.session.user_id,
      current_username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
