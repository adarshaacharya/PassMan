import AuthLayout from '@/components/AuthLayout';
import CredentialCover from '@/components/CredentialCover';
import prismaClient from '@/libs/server/prisma';
import { Creds } from '@/types';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { VaultCategory } from '@prisma/client';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { MdDelete, MdEdit } from 'react-icons/md';

type Props = {
  password: string;
} & Creds;

const CredentialDetail: NextPage<{ credential: Props }> = ({ credential }) => {
  const { createdAt, website, email, username, password } = credential;

  return (
    <AuthLayout>
      <Container maxW="container.md">
        <Flex direction="column" align="center" justify="center" h="70vh">
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            px="20"
            py="14"
          >
            <Center py="9">
              <CredentialCover url={website} />
            </Center>
            <hr />
            <Box py="15">
              <Text>Email : {email}</Text>
              <Text mt="5">Username : {username}</Text>
              <Text mt="5">Password : {password}</Text>
              <Text mt="5">Created At : {createdAt}</Text>
            </Box>

            <Center>
              <ButtonGroup spacing="6" mt="5">
                <Button
                  bg="gray.700"
                  color="whiteAlpha.900"
                  background="gray.700"
                  _hover={{
                    bg: 'gray.800',
                  }}
                  size="lg"
                  leftIcon={<MdEdit />}
                >
                  Edit
                </Button>
                <Button
                  size="lg"
                  bg="primary.500"
                  color="white"
                  _hover={{
                    bg: 'primary.600',
                  }}
                  leftIcon={<MdDelete />}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Center>
          </Box>
        </Flex>
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

  const credential = await prismaClient.credential.findFirst({
    where: {
      id: context?.params?.cid?.toString(),
      vault: { id: vault?.id },
    },
  });

  return {
    props: {
      credential: JSON.parse(JSON.stringify(credential)),
    },
  };
}
export default CredentialDetail;
