import { Category } from '@prisma/client';

export type VaultInfoSchema = {
  category: Category;
  isVaultCreated: boolean;
  ok: boolean;
};
