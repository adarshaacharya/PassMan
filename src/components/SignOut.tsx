import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { MdOutlineLogout } from 'react-icons/md';

function SignOut() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Button
      size="lg"
      p={8}
      rounded="full"
      type="button"
      bg="blackAlpha.900"
      color="whiteAlpha.900"
      _hover={{
        bg: 'blackAlpha.800',
      }}
      rightIcon={<MdOutlineLogout />}
      onClick={handleSignOut}
      position="absolute"
      top="5"
      right="5"
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
