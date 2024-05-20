import winston from 'winston';

const levelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
      },
  colors: {
    fatal: 'red',
    error: 'yellow',
    warning: 'magenta',
    info: 'blue',
    debug: 'white',
  },
};

winston.addColors(levelOptions.colors);

export class Logger {
  static devLogger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'debug', // Logueará todos los niveles desde 'debug' hasta 'fatal'
        format: winston.format.combine(
          winston.format.colorize({ colors: levelOptions.colors }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: './errors.log',
        level: 'error', // Logueará solo los niveles 'error' y 'fatal'
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
  });

  static prodLogger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'info', // Logueará todos los niveles desde 'info' hasta 'fatal'
        format: winston.format.combine(
          winston.format.colorize({ colors: levelOptions.colors }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: './errors.log',
        level: 'error', // Logueará solo los niveles 'error' y 'fatal'
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
  });
}

declare global {
  namespace Express {
    interface Request {
      logger?: winston.Logger;
    }
  }
}

export const prodLoggerInstance = Logger.prodLogger;
export const devLoggerInstance = Logger.devLogger;

