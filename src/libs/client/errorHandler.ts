import { AxiosError } from 'axios';

type Error = AxiosError & {
  response?: {
    data?: {
      error?: string;
      ok: false;
    };
  };
};

/**
 *
 * @param error : Error instance
 * @returns extracted description of error from AxiosError
 */
export const getErrorMessage = (error: Error) => {
  let message = 'Something went wrong';
  message = error.response?.data?.error ?? message;
  return message;
};
