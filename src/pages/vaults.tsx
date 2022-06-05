import { getVaultInformation } from '@/apis';
import AccountSelectBox from '@/components/AccountSelectBox';
import CreateVault from '@/components/CreateVault';
import EnterVault from '@/components/EnterVault';
import SignOut from '@/components/SignOut';
import { accountSelectCards } from '@/consts';
import { Vault } from '@/enums';
import { Button, Flex, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import { MdNavigateNext } from 'react-icons/md';

enum VaultModal {
  CREATE,
  ENTER,
}

function Dashboard() {
  const [selectedVault, setSelectedVault] = React.useState<Vault>(
    Vault.PERSONAL,
  );
  const [vaultModal, setVaultModal] = React.useState<VaultModal | null>(null);

  const handleAccountCardClick = React.useCallback((vault: Vault) => {
    setSelectedVault(vault);
  }, []);

  const handleVaultCreate = React.useCallback(() => {
    getVaultInformation().then((vaults) => {
      if (vaults.isVaultCreated) {
        setVaultModal(VaultModal.ENTER);
        return;
      }
      setVaultModal(VaultModal.CREATE);
    });
  }, []);

  const enterMode = React.useMemo(() => {
    return vaultModal === VaultModal.ENTER;
  }, [vaultModal]);

  const createMode = React.useMemo(() => {
    return vaultModal === VaultModal.CREATE;
  }, [vaultModal]);

  return (
    //  we don't recommend adding custom margins to the children of HStack, VStack or Stack. use Flex or use the shouldWrapChildren prop.
    <React.Fragment>
      <CreateVault isOpen={createMode} onClose={() => setVaultModal(null)} />
      <EnterVault isOpen={enterMode} onClose={() => setVaultModal(null)} />
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
    </React.Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
