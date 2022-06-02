import { Category } from '@prisma/client';

export type VaultResponse = {
  category: Category;
  isVaultCreated: boolean;
  ok: boolean;
};
