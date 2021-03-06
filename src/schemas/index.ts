import * as Yup from 'yup';

export const createVaultSchema = Yup.object().shape({
  key: Yup.string()
    .required('Vault key is required')
    .min(4, 'Vault key length should be at least 4 characters')
    .max(40, 'Vault key cannot exceed more than 40 characters'),

  keyConfirmation: Yup.string()
    .required('Confirm Vault key is required')
    .min(4, 'Vault key length should be at least 4 characters')
    .max(40, 'Vault key cannot exceed more than 40 characters')
    .oneOf([Yup.ref('key')], 'Vault keys do not match'),
});

export const enterVaultSchema = Yup.object().shape({
  key: Yup.string()
    .required('Vault key is required')
    .min(4, 'Vault key length should be at least 4 characters')
    .max(40, 'Vault key cannot exceed more than 40 characters'),
});

export const createCreditentialSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid'),
  username: Yup.string().required('Username is required'),
  website: Yup.string().required('Website is required'),
  description: Yup.string().required('Description is required'),
  password: Yup.string().required('Password is required'),
});
