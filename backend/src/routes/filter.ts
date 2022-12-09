import * as express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/api/filter', function (req, res) {
  res.send('Hello filter!');
});

export default router;
