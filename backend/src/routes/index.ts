import * as express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("Hello World!");
});

export default router;
