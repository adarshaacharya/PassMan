import { Vault } from '@/enums';
import { MdOutlineBusinessCenter, MdPersonOutline } from 'react-icons/md';

export const accountSelectCards = [
  {
    title: Vault.PERSONAL,
    description: 'Store your individual credentials of your home or office.',
    isReleased: true,
    icon: MdPersonOutline,
  },
  {
    title: Vault.BUSINESS,
    description:
      'Store credentials of your organization. Create user groups and share it with your teams.',
    isReleased: false,
    icon: MdOutlineBusinessCenter,
  },
];
