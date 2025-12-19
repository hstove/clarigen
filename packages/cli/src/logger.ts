import { pino } from 'pino';
import pinoPretty from 'pino-pretty';

export const colorizedClarigen = '\x1b[33m[Clarigen]\x1b[0m';

export const logger = pino(
  pinoPretty({
    colorize: true,
    ignore: 'pid,hostname,time',
    messageFormat: `${colorizedClarigen} {msg}`,
    minimumLevel: 'debug',
  })
);
logger.level = 'info';

export const log = logger;
