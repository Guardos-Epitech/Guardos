import * as express from 'express';
import { Response, Request } from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
import { filterRestaurants } from '../middleware/filterMiddleWare';

router.use(bodyParser.json());

router.get('/', function (req: Request, res: Response) {
  res.status(200)
    .send('Hello World!');
  return;
});

/* GET home page. */
router.get('/filter', function (req: Request, res: Response) {
  res.status(200)
    .send('Hello filter!');
});

router.post('/filter', function (req: Request, res: Response) {
  const answer = filterRestaurants(req, req.app.get('db'));
  return res.send(answer);
});

export default router;
