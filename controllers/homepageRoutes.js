const router = require("express").Router();
const { User, Category, Event } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    let eventData;
    req.query.page
      ? (eventData = await Event.findAll({
          limit: 5,
          offset: (parseInt(req.query.page) - 1) * 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }))
      : (eventData = await Event.findAll({
          limit: 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }));

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("homepage", {
      events,
      current_user_id: req.session.user_id,
      current_username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/career", async (req, res) => {
  try {
    let eventData;
    req.query.page
      ? (eventData = await Event.findAll({
          where: {
            category_id: 1,
          },
          limit: 5,
          offset: (parseInt(req.query.page) - 1) * 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }))
      : (eventData = await Event.findAll({
          where: {
            category_id: 1,
          },
          limit: 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }));

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("homepage", {
      events,
      current_user_id: req.session.user_id,
      current_username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/knowledge", async (req, res) => {
  try {
    let eventData;
    req.query.page
      ? (eventData = await Event.findAll({
          where: {
            category_id: 2,
          },
          limit: 5,
          offset: (parseInt(req.query.page) - 1) * 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }))
      : (eventData = await Event.findAll({
          where: {
            category_id: 2,
          },
          limit: 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }));

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("homepage", {
      events,
      current_user_id: req.session.user_id,
      current_username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/share-interest", async (req, res) => {
  try {
    let eventData;
    req.query.page
      ? (eventData = await Event.findAll({
          where: {
            category_id: 3,
          },
          limit: 5,
          offset: (parseInt(req.query.page) - 1) * 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }))
      : (eventData = await Event.findAll({
          where: {
            category_id: 3,
          },
          limit: 5,
          include: [
            {
              model: User,
              as: "creator",
              attributes: { exclude: ["password", "admin", "email"] },
            },
          ],
        }));

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("homepage", {
      events,
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
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password", "admin"] },
      include: [
        {
          model: Event,
          as: "created",
        },
        {
          model: Event,
          as: "attend",
          include: {
            model: User,
            as: "creator",
            attributes: { exclude: ["password", "admin"] },
          },
          through: { attributes: [] },
        },
      ],
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

router.get("/dashboard/new-event", withAuth, async (req, res) => {
  try {
    res.render("new-event", {
      current_user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/dashboard/update-event/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);
    const event = eventData.get({ plain: true });
    event.user_id === req.session.id
      ? res.render("update-event", {
          current_user_id: req.session.user_id,
          logged_in: req.session.logged_in,
        })
      : res.redirect("/");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: { exclude: ["password", "admin"] },
        },
        {
          model: User,
          as: "attendee",
          attributes: {
            exclude: ["password", "admin"],
          },
          through: { attributes: [] },
        },
      ],
    });
    const event = eventData.get({ plain: true });
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
