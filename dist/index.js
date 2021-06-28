"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./src/app"));
var port = Number(process.env.PORT) || 3000;
// const server = createServer(app());
var server = app_1.default().listen(port, function () {
    console.log(port + "\uD3EC\uD2B8 \uC11C\uBC84 \uB300\uAE30 \uC911!");
});
exports.default = server;
//# sourceMappingURL=index.js.map