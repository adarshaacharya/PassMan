import { getVaultInformation } from '@/apis';
import AccountSelectBox from '@/components/AccountSelectBox';
import SignOut from '@/components/SignOut';
import { accountSelectCards } from '@/consts';
import { Vault } from '@/enums';
import { Button, Flex, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import { MdNavigateNext } from 'react-icons/md';

function Dashboard() {
  const [selectedVault, setSelectedVault] = React.useState<Vault>(
    Vault.PERSONAL,
  );

  const handleAccountCardClick = React.useCallback((vault: Vault) => {
    setSelectedVault(vault);
  }, []);

  const handleVaultCreate = React.useCallback(() => {
    getVaultInformation().then((vaults) => {
      if (vaults.isVaultCreated) {
        alert('Vault already created');
        return;
      }
    });
  }, []);

  return (
    //  From a usage standpoint, we don't recommend adding custom margins to the children of HStack, VStack or Stack.
    // If you ever need to, then maybe you don't need to use them and reach for Flex or use the shouldWrapChildren prop.
    <Stack
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      shouldWrapChildren
    >
      <SignOut />
      <Heading as="h1" size="2xl" color="gray.700">
        Choose Vault Type
      </Heading>
      <SimpleGrid spacing={8} mt={8} columns={{ base: 1, md: 2 }}>
        {accountSelectCards.map((cardDetails, index) => (
          <AccountSelectBox
            key={index}
            details={cardDetails}
            handleClick={handleAccountCardClick}
            selectedVault={selectedVault}
          />
        ))}
      </SimpleGrid>

      <Flex flex={1}>
        <Button
          size="lg"
          bg="primary.600"
          color="whiteAlpha.900"
          fontSize="xl"
          px={24}
          py={8}
          type="submit"
          mt={14}
          _hover={{
            bg: 'primary.500',
          }}
          rightIcon={<MdNavigateNext />}
          onClick={handleVaultCreate}
        >
          Next
        </Button>
      </Flex>
    </Stack>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
