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

export type EnterVaultRequest = CreatVaultRequest;

export type EnterVaultResponse = CreateVaultResponse;

export type CreateCredentialRequest = {
  email?: string;
  username?: string;
  website: string;
  description: string;
  password: string;
  category: Vault;
};
