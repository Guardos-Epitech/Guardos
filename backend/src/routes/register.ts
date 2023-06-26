import * as express from 'express';
import { Response, Request } from 'express';
import { addUser } from '../controllers/userController';

const router = express.Router();

router.post('/', async function (req: Request, res: Response) {
  try {
    const data = req.body;
    const errArray = await addUser(data.username, data.email, data.password);

    return res.send(errArray);
  } catch (error) {
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

export default router;

