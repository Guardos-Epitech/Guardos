import * as express from 'express';
import filter from './routes/filter';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('Hello World!!!!');
});

router.get('/api/filter', filter);

export default router;
