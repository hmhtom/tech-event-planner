const router = require("express").Router();
const { User, Category, Event, Participant } = require("../models");
const withAuth = require("../utils/withAuth");

module.exports = router;
