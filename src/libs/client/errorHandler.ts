import { AxiosError } from 'axios';

type Error = AxiosError & {
  response?: {
    data?: {
      error?: string;
      ok: false;
    };
  };
};

export const getErrorMessage = (error: Error) => {
  let message = 'Something went wrong';
  if (error.response) {
    message = error.response?.data?.error || message;
  }

  return message;
};
