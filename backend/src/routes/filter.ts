import bodyParser from 'body-parser';
import * as express from 'express';
import {Response, Request} from 'express';

import {handleFilterRequest} from '../middleware/filterMiddleWare';

const router = express.Router();

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

router.post('/filter', async function (req: Request, res: Response) {
  const answer = await handleFilterRequest(req.body);
  return res.send(answer);
});

export default router;
