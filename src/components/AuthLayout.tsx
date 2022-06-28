import { Avatar, Button, HStack, Stack } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { MdArrowBack, MdOutlineLogout } from 'react-icons/md';

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
  };

  const name = data?.user?.name ?? '';
  const avatar = data?.user?.image ?? '';

  return (
    <React.Fragment>
      <Stack
        flex={{ base: 1, md: 0 }}
        justify="space-between"
        direction="row"
        alignItems="center"
        spacing={6}
        pt="4"
        px="8"
      >
        <Avatar
          name={name}
          size="xl"
          src={avatar}
          onClick={() => router.push('/vaults')}
        />

        <HStack spacing={8}>
          <Button
            leftIcon={<MdArrowBack />}
            size="lg"
            rounded="full"
            onClick={() => router.push('/vaults')}
          >
            Go to vaults
          </Button>
          <Button
            size="lg"
            rounded="full"
            type="button"
            bg="gray.800"
            color="whiteAlpha.900"
            _hover={{
              bg: 'blackAlpha.800',
            }}
            rightIcon={<MdOutlineLogout />}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </HStack>
      </Stack>
      {children}
    </React.Fragment>
  );
}

export default AuthLayout;
