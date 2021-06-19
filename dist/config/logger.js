"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = void 0;
// logger.ts
var winston_1 = __importStar(require("winston"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var logDir = 'logs';
// 직접 정의한 로그 레벨
var customLevels = {
    customedError: 0,
    customedWarn: 1,
    customedInfo: 2,
    customedDebug: 3,
    customedSilly: 4
};
// 레벨별 색상 * 주어지지않은 색상을 넣을 경우 오류 발생
var customColors = {
    customedError: 'red',
    customedWarn: 'yellow',
    customedInfo: 'cyan',
    customedDebug: 'magenta',
    customedSilly: 'gray'
};
// 색상을 추가하고싶다면 winston에게 이를 알려야한다. (README 참고)
winston_1.default.addColors(customColors);
exports.customLogger = winston_1.createLogger({
    levels: customLevels,
    format: winston_1.format.combine(winston_1.format.label({ label: '[customed-server]' }), winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.colorize(), // 색상을 보고싶다면 꼭 추가!
    winston_1.format.printf(function (info) { return info.timestamp + " - " + info.level + ": " + info.label + " " + info.message; })),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winston_daily_rotate_file_1.default({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: "%DATE%.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winston_daily_rotate_file_1.default({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: "%DATE%.error.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
        // debug 레벨 로그를 저장할 파일 설정
        new winston_daily_rotate_file_1.default({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/debug',
            filename: "%DATE%.debug.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
    ]
});
// Production 환경이 아닌 경우(dev 등) 
if (process.env.NODE_ENV !== 'production') {
    exports.customLogger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.label({ label: '[customed-server]' }), winston_1.format.colorize(), // 색깔 넣어서 출력
        winston_1.format.simple())
    }));
}
//# sourceMappingURL=logger.js.map