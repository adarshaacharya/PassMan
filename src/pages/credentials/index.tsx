import AuthLayout from '@/components/AuthLayout';
import CreateCredential from '@/components/CreateCredential';
import CredentialCard from '@/components/CredentialCard';
import { Vault } from '@/enums';
import prismaClient from '@/libs/server/prisma';
import { Creds } from '@/types';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { VaultCategory } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';

const CredetialsPage = ({ credentials }: { credentials: Creds[] }) => {
  const [credsModal, setcredsModal] = React.useState(false);

  const handleCredentialCreate = React.useCallback(() => {
    setcredsModal(true);
  }, []);

  return (
    <AuthLayout>
      <Container maxW="container.xl">
        <Heading size="3xl" color="gray.600" textAlign="center" py="10">
          Credentials
        </Heading>

        {credsModal && (
          <CreateCredential
            isOpen={credsModal}
            vaultCategory={Vault.PERSONAL}
            onClose={() => setcredsModal(false)}
          />
        )}

        {credentials.length && (
          <Flex minWidth="max-content" justify="flex-end">
            <Box>
              <Button
                leftIcon={<MdAdd />}
                colorScheme="primary"
                variant="solid"
                size="lg"
                onClick={handleCredentialCreate}
              >
                Add Credential
              </Button>
            </Box>
          </Flex>
        )}

        {!credentials.length && (
          <Stack
            justify="center"
            align="center"
            direction="column"
            py="10"
            px="10"
            color="gray.600"
            h="60vh"
            spacing="12"
          >
            <Text textAlign="center">
              No credentials found. Please add one by clcking on Add Credential
              button.
            </Text>
            <Button
              leftIcon={<MdAdd />}
              colorScheme="primary"
              variant="solid"
              size="lg"
              onClick={handleCredentialCreate}
            >
              Add Credential
            </Button>
          </Stack>
        )}

        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={{ base: 8, md: 16 }}
          py="14"
        >
          {credentials.map((credential) => {
            return (
              <GridItem
                key={credential.id}
                bg="whiteAlpha.900"
                borderColor="gray.200"
                rounded="2xl"
                _hover={{
                  bg: 'gray.200',
                  cursor: 'pointer',
                }}
              >
                <CredentialCard credential={credential} />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </AuthLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const userId = session?.user?.id;

  const vault = await prismaClient.vault.findFirst({
    where: {
      category: VaultCategory.PERSONAL,
      owner: { id: userId },
    },
  });

  const credentials = await prismaClient.credential.findMany({
    where: {
      category: VaultCategory.PERSONAL,
      vault: { id: vault?.id },
    },
  });

  return {
    props: {
      credentials: JSON.parse(JSON.stringify(credentials)),
    },
  };
}
export default CredetialsPage;
