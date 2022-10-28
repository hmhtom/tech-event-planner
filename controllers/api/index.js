const router = require("express").Router();
const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");
const categoriesRoutes = require("./categoriesRoutes");

router.use("/user", userRoutes);
router.use("/event", eventRoutes);
router.use("/categories", categoriesRoutes);

module.exports = router;
