import { Creds } from './types';

export const credentials = [
  {
    id: '1',
    website: 'https://www.google.com',
    username: 'adarsha',
    createdAt: '2022-06-03 17:24:20.192',
  },
  {
    id: '2',
    website: 'https://www.facebook.com',
    email: 'test@gmail.com',
    createdAt: '2022-06-05 17:24:20.192',
  },
  {
    id: '3',
    website: 'https://www.instagram.com',
    username: 'jethalal',
    createdAt: '2022-05-06 17:24:20.192',
  },
  {
    id: '4',
    website: 'https://www.twitter.com',
    username: 'danabmarov',
    createdAt: '2022-04-07 17:24:20.192',
  },
  {
    id: '5',
    website: 'https://www.linkedin.com',
    email: 'testmail@mail.com',
    createdAt: '2022-03-08 17:24:20.192',
  },
  {
    id: '6',
    website: 'https://www.adarshaacharya.com.np',
    username: 'johny',
    createdAt: '2022-06-03 17:24:20.192',
  },
];

export const getCredentials = (): Promise<Array<Creds>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(credentials);
    }, 1000);
  });
};
