const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const commentData = await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        event_id: req.body.event_id,
      });
      res.status(200).json(commentData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
});

module.exports = router;
