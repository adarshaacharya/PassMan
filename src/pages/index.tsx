import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import landing from 'public/landing.webp';

const Home = () => {
  const handleSingIn = async () => {
    await signIn('github', {
      callbackUrl: '/dashboard',
    });
  };
  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} p={8} align="center" justify="center">
        <Stack spacing={8} maxW="75%">
          <Box>
            <Heading
              as="span"
              fontSize="7xl"
              color="gray.700"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                position: 'absolute',
                height: '30%',
                bottom: 1,
                left: 0,
                bg: 'primary.300',
                zIndex: -1,
              }}
            >
              PassMan
            </Heading>
            <Heading
              as="h2"
              fontSize="3xl"
              opacity="0.7"
              mt="3"
              lineHeight="1.5"
            >
              You were not born to remember passwords.
            </Heading>
            <Text fontSize="xl" mt="2" color="gray.600">
              Life is happening online. PassMan puts your digital life at your
              fingertips, simply and securely.
            </Text>
          </Box>
          <Box>
            <ButtonGroup gap={4} flexDirection={{ base: 'column', sm: 'row' }}>
              <Button
                borderRadius="8px"
                size="lg"
                fontSize="xl"
                p="9"
                bg="primary.600"
                _hover={{
                  bg: 'primary.500',
                }}
                color="white"
                leftIcon={<AiFillGithub />}
                onClick={handleSingIn}
              >
                Sign in with GitHub
              </Button>
              <Button
                borderRadius="8px"
                size="lg"
                py="9"
                bg="gray.300"
                fontSize="xl"
                leftIcon={<MdOutlineEmail />}
              >
                Sign in with Email
              </Button>
            </ButtonGroup>
            <Text fontSize="lg" opacity="0.8" mt="3">
              *Only Github login works for now
            </Text>
          </Box>
        </Stack>
      </Flex>
      <Flex flex={1} align="center" justify="center">
        <Box w={{ base: '80%', md: 'full' }}>
          <Image
            alt="Login Image"
            width="700"
            height="700"
            objectFit="contain"
            placeholder="blur"
            src={landing}
          />
        </Box>
      </Flex>
    </Stack>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
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

export default Home;
