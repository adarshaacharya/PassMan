import { VaultResponse } from './types';

export const getVaultInformation = async (): Promise<VaultResponse> => {
  try {
    const res = await fetch('/api/vaults');
    const vaults = await res.json();
    return vaults;
  } catch (err) {
    return err;
  }
};
