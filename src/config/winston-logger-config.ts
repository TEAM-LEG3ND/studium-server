import { format, transports, createLogger } from 'winston';

export const initWinstonConfigInstance = () => {
  return createLogger({
    transports: [
      new transports.File({
        filename: `logs/error.log`,
        level: 'error',
        format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }), format.json()),
      }),

      new transports.File({
        filename: `logs/every.log`,
        format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }), format.json()),
      }),

      new transports.Console({
        format: format.combine(
          format.cli(),
          format.splat(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }),
          format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
          }),
        ),
      }),
    ],
  });
};
