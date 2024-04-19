import { Session } from '../session';

export function generateAccountsCode(session: Session) {
  const accounts = Object.fromEntries(
    session.accounts.map(account => {
      const { name, ...rest } = account;
      return [name, rest];
    })
  );

  return `export const accounts = ${JSON.stringify(accounts)} as const;`;
}
