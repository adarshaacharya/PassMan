import { Vault } from '@/enums';

export type VaultInfoResponse = {
  category: Vault;
  isVaultCreated: boolean;
  ok: boolean;
};

export type CreatVaultRequest = {
  category: Vault;
  key: string;
};

export type CreateVaultResponse = {
  ok: boolean;
};

export type EnterVaultRequest = Omit<CreatVaultRequest, 'category'>;

export type EnterVaultResponse = CreateVaultResponse;
