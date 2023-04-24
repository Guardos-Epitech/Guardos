import * as express from 'express';
import { Response, Request } from 'express';
import bodyParser from 'body-parser';

import { geocoding } from '../middleware/mapMiddleware';
import { handleFilterRequest, handleSelectedFilterRequest } from '../middleware/filterMiddleWare';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', function (res: Response) {
  res.status(200)
    .send('Hello World!');
  return;
});

/* GET home page. */
router.get('/filter', function (res: Response) {
  res.status(200)
    .send('Hello filter!');
});

router.post('/filter', async function (req: Request, res: Response) {
  try {
    const answer = await handleFilterRequest(req.body);
    return res.send(answer);
  } catch (error) {
    console.log(error);
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

router.post('/filteredlist', async function (req: Request, res: Response) {
  try {
    const answer = await handleSelectedFilterRequest(req.body);
    return res.send(answer);
  } catch (error) {
    console.log(error);
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

router.post('/map', function (req: Request, res: Response) {
  console.log(req.body);
  const answer = geocoding(req);
  answer.then(function (result) {
    return res.send(result);
  });
});

export default router;
