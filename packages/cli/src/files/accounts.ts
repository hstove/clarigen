import { Session, SessionAccount } from '../session';

export function generateAccountsCode(accounts: SessionAccount[]) {
  const sortedAccounts = sortAccounts(accounts);
  return Object.fromEntries(
    sortedAccounts.map(a => {
      const { name, ...rest } = a;
      return [name, rest];
    })
  );
}

// Sort accounts alphabetically by their name.
// Used to preserve ordering when generating files
export function sortAccounts(accounts: SessionAccount[]): SessionAccount[] {
  const nameSorted = [...accounts].sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });
  return nameSorted;
}
