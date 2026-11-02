import type { Config } from '../config';
import { logger } from '../logger';
import { spawn } from 'node:child_process';

// biome-ignore lint/suspicious/useAwait: ignored using `--suppress`
export async function afterDocs(config: Config): Promise<void> {
  const command = config.docs?.after;
  if (!command) return;
  logger.debug(`Running after docs command: ${command}`);
  const parts = command.split(' ');
  const [cmd, ...args] = parts;
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: config.cwd,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code ?? 'unknown'}`));
      }
    });
  });
}
