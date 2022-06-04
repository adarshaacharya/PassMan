import Axios from 'axios';
import { VaultInfoSchema } from './types';

export const getVaultInformation = async (): Promise<VaultInfoSchema> => {
  return Axios.post('/api/vault');
};
