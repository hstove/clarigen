import { pino } from 'pino';
import pinoPretty from 'pino-pretty';

export const colorizedClarigen = `\x1b[33m[Clarigen]\x1b[0m`;

export const logger = pino(
  pinoPretty({
    colorize: true,
    ignore: 'pid,hostname',
    messageFormat: `${colorizedClarigen} {msg}`,
  })
);

export const log = logger;
