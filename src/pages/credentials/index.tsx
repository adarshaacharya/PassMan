import AuthLayout from '@/components/AuthLayout';
import CreateCredential from '@/components/CreateCredential';
import CredentialCard from '@/components/CredentialCard';
import { Vault } from '@/enums';
import { getCredentials } from '@/services';
import { endpoints } from '@/services/endpoints';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useQuery } from 'react-query';

const CredetialsPage = () => {
  const [credsModal, setCredsModal] = React.useState(false);

  const {
    data: credentials,
    isLoading,
    isError,
  } = useQuery(endpoints.credentials, getCredentials);

  const handleCredentialCreate = React.useCallback(() => {
    setCredsModal(true);
  }, []);

  //@todo: consult for better approach to show loading state
  if (!credentials || isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return <Text>Error loading credentials</Text>;
  }

  return (
    <AuthLayout>
      <Container maxW="container.xl">
        <Heading size="3xl" color="gray.600" textAlign="center" py="10">
          CREDENTIALS
        </Heading>

        {credsModal && (
          <CreateCredential
            isOpen={credsModal}
            vaultCategory={Vault.PERSONAL}
            onClose={() => setCredsModal(false)}
          />
        )}

        {credentials.length > 0 && (
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

        {credentials.length === 0 && (
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
                mb="14"
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

export default CredetialsPage;
