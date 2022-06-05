import HttpClient from '@/libs/client/HttpClient';
import {
  CreateVaultResponse,
  CreatVaultRequest,
  VaultInfoSchema,
} from './types';

export const getVaultInformation = async () => {
  return HttpClient.get<VaultInfoSchema>('/vaults');
};

export const createVault = async ({ category, key }: CreatVaultRequest) => {
  return HttpClient.post<CreateVaultResponse>('/vaults/create', {
    category,
    key,
  });
};

export const enterVault = async ({ key }: CreatVaultRequest) => {
  return HttpClient.post<CreateVaultResponse>('/vaults/enter', {
    key,
  });
};
