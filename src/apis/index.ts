import { Vault } from '@/enums';
import HttpClient from '@/libs/client/HttpClient';
import {
  CreateVaultResponse,
  CreatVaultRequest,
  VaultInfoResponse,
} from './types';

export const enterVaultInformation = async (vaultCategory: Vault) => {
  return HttpClient.post<VaultInfoResponse>('/vaults', {
    category: vaultCategory,
  });
};

export const createVault = async ({ category, key }: CreatVaultRequest) => {
  return HttpClient.post<CreateVaultResponse>('/vaults/create', {
    category,
    key,
  });
};

export const enterVault = async ({ key, category }: CreatVaultRequest) => {
  return HttpClient.post<CreateVaultResponse>('/vaults/enter', {
    key,
    category,
  });
};
