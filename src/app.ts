import express,{Application} from "express";
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import Logger from '../config/logger';
import UserRoute from "./app/User/userRoute";

const App = function ():Application{
  const app: Application = express();

  app.use(compression());

  app.use(express.json());

  app.use(express.urlencoded({extended: true}));

  app.use(methodOverride());

  app.use(cors());
  // app.use(express.static(process.cwd() + '/public'));

  /* App (Android, iOS) */
  // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
  UserRoute(app);
  // require('../src/app/Board/boardRoute')(app);

  return app;
};

export default App;


// app.get(
//   "/info",
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     Logger.info('GET /info');

//     res.send("hello typescript express!");
//   }
// );

// app.get("/logger", (_, res) => {
//   Logger.error("This is an error log");
//   Logger.warn("This is a warn log");
//   Logger.info("This is a info log");
//   Logger.http("This is a http log");

//   res.send("Hello world");
// });