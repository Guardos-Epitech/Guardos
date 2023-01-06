import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path = require('path');
import filter from './routes/filter';
import { connectDataBase, SUCCEED } from './controllers/connectDataBase';

async function main() {
  const app = express();
  const port = 8081;

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  if(await connectDataBase() === SUCCEED) {
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }

  app.use('/api', filter);

  // catch 404 and forward to error handler
  app.use(function(req: any, res: any, next: any) { /* eslint-disable-line */
    next(createError(404));
  });

  // error handler
  app.use(function(err: any, req: any, res: any) { /* eslint-disable-line */
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

try {
  main();
} catch (err: unknown) {
  console.error(err);
}
