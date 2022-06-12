import AuthLayout from '@/components/AuthLayout';
import CredentialCover from '@/components/CredentialCover';
import useToast from '@/hooks/useToast';
import Aes256 from '@/libs/server/Aes256';
import prismaClient from '@/libs/server/prisma';
import { deleteCredential } from '@/services';
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
import { format } from 'date-fns';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

type Props = {
  password: string;
} & Creds;

const CredentialDetail: NextPage<{ credential: Props }> = ({ credential }) => {
  const router = useRouter();
  const cid = router.query.cid as string;
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleCredentialDelete = React.useCallback(() => {
    deleteCredential(cid)
      .then(() => {
        router.push('/credentials');
        showToast({
          title: 'Credential deleted',
          description: 'Your credential has been deleted',
          status: 'success',
        });
      })
      .catch(() => {
        showToast({
          title: 'Error',
          description: 'Failed to delete credential',
          status: 'error',
        });
      });
  }, [cid, router, showToast]);

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
            maxW="450px"
            wordBreak="break-all"
          >
            <Center py="9">
              <CredentialCover url={website} />
            </Center>
            <hr />
            <Box py="15">
              <Text>Email : {email}</Text>
              <Text mt="5">Username : {username}</Text>
              <Text mt="5">
                Password : &nbsp;
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  readOnly
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    width: password.length * 10,
                  }}
                />
                <Button
                  size="sm"
                  ml="5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </Text>
              <Text mt="5">
                Created at : {format(new Date(createdAt), 'MMM dd, yyyy')}
              </Text>
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
                  onClick={handleCredentialDelete}
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

  let credential = await prismaClient.credential.findFirst({
    where: {
      id: context?.params?.cid?.toString(),
      vault: { id: vault?.id },
    },
    include: {
      vault: {
        select: {
          key: true,
        },
      },
    },
  });

  if (!credential) {
    context.res.statusCode = 404;
    return {
      notFound: true,
    };
  }

  const decryptedPassword = Aes256.getInstance().decryptSync({
    hashedVaultKey: credential.vault.key,
    initializationVector: credential.initializationVector,
    encryptedPassword: credential.password,
  });

  credential = {
    ...credential,
    password: decryptedPassword,
  };

  return {
    props: {
      credential: JSON.parse(JSON.stringify(credential)),
    },
  };
}
export default CredentialDetail;
