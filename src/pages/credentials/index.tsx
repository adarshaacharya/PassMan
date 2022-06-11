import AuthLayout from '@/components/AuthLayout';
import CreateCredential from '@/components/CreateCredential';
import CredentialCover from '@/components/CredentialCover';
import { Vault } from '@/enums';
import { Creds, getCredentials } from '@/mock';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';
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
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={{ base: 8, md: 16 }}
          py="14"
        >
          {credentials.map((credential: Creds) => {
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
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="auto"
                  boxShadow="lg"
                  p={10}
                  textAlign="center"
                >
                  <CredentialCover url={credential.website} />
                  <Box py="10">
                    <Text>{credential.website}</Text>
                    <Text>{credential.email ?? credential.username}</Text>
                  </Box>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </AuthLayout>
  );
};

export async function getServerSideProps() {
  const credentials = await getCredentials();
  return {
    props: {
      credentials,
    },
  };
}
export default CredetialsPage;
