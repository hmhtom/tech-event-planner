const router = require("express").Router();
const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/event", eventRoutes);
router.use("/categories", categoriesRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
