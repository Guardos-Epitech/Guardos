import bodyParser from 'body-parser';
import * as express from 'express';
import { Response, Request } from 'express';

import { handleFilterRequest } from '../middleware/filterMiddleWare';

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
  try {

    const answer = await handleFilterRequest(req.body);
    return res.send(answer);
  } catch (error) {
    console.log(error);
    return res.status(500).send('An error occurred while processing your request');
  }
});

export default router;
