"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
const port = Number(process.env.PORT) || 3000;
// const server = createServer(app());
const server = app_1.default().listen(port, () => {
    console.log(`${port}포트 서버 대기 중!`);
});
exports.default = server;
//# sourceMappingURL=index.js.map