import bodyParser from 'body-parser';
import * as express from 'express';
import { Response, Request } from 'express';
import { loginUser } from '../controllers/userController';

const router = express.Router();

router.use(bodyParser.json());

router.post('/', async function (req: Request, res: Response) {
  try {
    const data = req.body;
    const answer = await loginUser(data.username, data.password);

    if (answer) {
      return res.send(data);
    } else {
      return res.send('Invalid Access');
    }
  } catch (error) {
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

export default router;
