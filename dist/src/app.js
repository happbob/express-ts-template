"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = require("../config/logger");
var app = express_1.default();
app.get("/", function (req, res, next) {
    logger_1.customLogger.customedInfo('GET /info');
    res.send("hello typescript express!");
});
exports.default = app;
//# sourceMappingURL=app.js.map