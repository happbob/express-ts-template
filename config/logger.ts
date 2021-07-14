import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
const logDir = "logs/";
// Define your severity levels. 
// With them, You can create log files, 
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  info: 1
}

// This method set the current severity based on 
// the current NODE_ENV: show all the log levels 
// if the server was run in development mode; otherwise, 
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Define different colors for each level. 
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// Tell winston that you want to link the colors 
// defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the label
  winston.format.label({ label: '[my-server]' }),
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`,
  ),
)

// Define which transports the logger must use to print out messages. 
// In this example, we are using three different transports 
const transports = [
  // info 레벨 로그를 저장할 파일 설정
  new winstonDaily({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    filename: `%DATE%.log`,
    maxFiles: 30,  // 30일치 로그 파일 저장
    zippedArchive: true, 
  }),
  // error 레벨 로그를 저장할 파일 설정
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
    filename: `%DATE%.error.log`,
    maxFiles: 30,
    zippedArchive: true,
  }),

  // Allow the use the console to print the messages
  new winston.transports.Console(),
]

// Create the logger instance that has to be exported 
// and used to log messages.
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default Logger;