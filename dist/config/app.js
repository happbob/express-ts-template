"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
const userRoute_1 = __importDefault(require("../src/app/User/userRoute"));
const App = function () {
    const app = express_1.default();
    app.use(compression_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(method_override_1.default());
    app.use(cors_1.default());
    // app.use(express.static(process.cwd() + '/public'));
    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    userRoute_1.default(app);
    // require('../src/app/Board/boardRoute')(app);
    return app;
};
exports.default = App;
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
//# sourceMappingURL=app.js.map