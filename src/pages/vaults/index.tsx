import { enterVaultInformation } from '@/services';
import AccountSelectBox from '@/components/AccountSelectBox';
import CreateVault from '@/components/CreateVault';
import EnterVault from '@/components/EnterVault';
import AuthLayout from '@/components/AuthLayout';
import { accountSelectCards } from '@/consts';
import { Vault } from '@/enums';
import { Button, Flex, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import { MdNavigateNext } from 'react-icons/md';
import useToast from '@/hooks/useToast';
import Head from 'next/head';

enum VaultModal {
  CREATE,
  ENTER,
}

function Dashboard() {
  const { showToast } = useToast();
  const [selectedVault, setSelectedVault] = React.useState<Vault>(
    Vault.PERSONAL,
  );
  const [vaultModal, setVaultModal] = React.useState<VaultModal | null>(null);
  const [vaultCategory, setVaultCategory] = React.useState<Vault>(
    Vault.PERSONAL,
  );
  const [isEnteringVaultInformation, setIsEnteringVaultInformation] =
    React.useState(false);

  const handleAccountCardClick = React.useCallback((vault: Vault) => {
    setSelectedVault(vault);
  }, []);

  const handleVaultCreate = React.useCallback(() => {
    setIsEnteringVaultInformation(true);
    if (selectedVault === Vault.BUSINESS) {
      showToast({
        status: 'warning',
        description: 'Business vault is not released yet.',
      });
      return;
    }

    enterVaultInformation(vaultCategory)
      .then((vault) => {
        setVaultCategory(vault.category);
        if (vault.isVaultCreated) {
          setVaultModal(VaultModal.ENTER);
          return;
        }
        setVaultModal(VaultModal.CREATE);
      })
      .catch((error) => {
        showToast({
          status: 'error',
          description: error.message,
        });
      })
      .finally(() => {
        setIsEnteringVaultInformation(false);
      });
  }, [selectedVault, showToast, vaultCategory]);

  const enterMode = React.useMemo(() => {
    return vaultModal === VaultModal.ENTER;
  }, [vaultModal]);

  const createMode = React.useMemo(() => {
    return vaultModal === VaultModal.CREATE;
  }, [vaultModal]);

  return (
    //  we don't recommend adding custom margins to the children of HStack, VStack or Stack. use Flex or use the shouldWrapChildren prop.
    <AuthLayout>
      <Head>
        <title>Vaults | Passman</title>
      </Head>
      <CreateVault
        vaultCategory={vaultCategory}
        isOpen={createMode}
        onClose={() => setVaultModal(null)}
      />
      <EnterVault
        vaultCategory={vaultCategory}
        isOpen={enterMode}
        onClose={() => setVaultModal(null)}
      />
      <Stack
        minH="100vh"
        alignItems="center"
        justifyContent="center"
        shouldWrapChildren
      >
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
            isLoading={isEnteringVaultInformation}
            onClick={handleVaultCreate}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </AuthLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
