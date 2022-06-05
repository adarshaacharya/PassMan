import { VaultCategory } from '@prisma/client';

export type VaultInfoSchema = {
  category: VaultCategory;
  isVaultCreated: boolean;
  ok: boolean;
};

export type CreatVaultRequest = {
  category: VaultCategory;
  key: string;
};

export type CreateVaultResponse = {
  ok: boolean;
};

export type EnterVaultRequest = Omit<CreatVaultRequest, 'category'>;

export type EnterVaultResponse = CreateVaultResponse;
