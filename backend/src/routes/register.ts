import bodyParser from 'body-parser';
import * as express from 'express';
import { Response, Request } from 'express';
import { addUser } from '../controllers/userController';

const router = express.Router();

router.use(bodyParser.json());

router.post('/', async function (req: Request, res: Response) {
  try {
    const data = req.body;
    await addUser(data.username, data.email, data.password);
    console.log(data);
    return res.send('Hello World!');
  } catch (error) {
    console.log(error);
    console.log('yep');
    return res.status(500)
      .send('An error occurred while processing your request');
  }
});

export default router;

