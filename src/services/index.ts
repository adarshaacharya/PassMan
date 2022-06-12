import { Vault } from '@/enums';
import HttpClient from '@/libs/client/HttpClient';
import { endpoints } from './endpoints';
import {
  CreateCredentialRequest,
  CreateVaultResponse,
  CreatVaultRequest,
  VaultInfoResponse,
} from './types';

export const enterVaultInformation = async (vaultCategory: Vault) => {
  return HttpClient.post<VaultInfoResponse>(endpoints.vaults.info, {
    category: vaultCategory,
  });
};

export const createVault = async ({ category, key }: CreatVaultRequest) => {
  return HttpClient.post<CreateVaultResponse>(endpoints.vaults.create, {
    category,
    key,
  });
};

export const enterVault = async ({ key, category }: CreatVaultRequest) => {
  return HttpClient.post<CreateVaultResponse>(endpoints.vaults.enter, {
    key,
    category,
  });
};

export const createCreditential = async ({
  category,
  description,
  email,
  password,
  username,
  website,
}: CreateCredentialRequest) => {
  return HttpClient.post<CreateVaultResponse>(endpoints.credentials, {
    email,
    username,
    website,
    description,
    password,
    category,
  });
};

export const deleteCredential = async (cid: string) => {
  return HttpClient.delete<CreateVaultResponse>(
    `${endpoints.credentials}/${cid}`,
  );
};
