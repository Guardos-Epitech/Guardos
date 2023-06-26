import * as express from 'express';
import { Response, Request } from 'express';

import { getAllergens, updateAllergens } from '../controllers/userController';

const router = express.Router();

router.post('/allergens/update', async function (req: Request, res: Response) {
  try {
    const data = req.body;
    const answer = await updateAllergens(data.username, data.allergens);
    return res.send(answer);
  } catch (error) {
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

router.post('/allergens/get', async function (req: Request, res: Response) {
  try {
    const data = req.body;
    const answer = await getAllergens(data.username);
    return res.send(answer);
  } catch (error) {
    console.log(error);
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

export default router;