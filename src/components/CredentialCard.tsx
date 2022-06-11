import { Creds } from '@/types';
import { Box, Button, Link, Text, useColorModeValue } from '@chakra-ui/react';
import CredentialCover from './CredentialCover';
import NextLink from 'next/link';

const CredentialCard = ({ credential }: { credential: Creds }) => {
  const { id, website, email, username } = credential;
  return (
    <Box
      shadow="xl"
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      overflow="hidden"
      p="10"
      textAlign="center"
      w="full"
      borderWidth="1px"
    >
      <CredentialCover url={website} />
      <Box py="16">
        <Link href={website} color="blue.700" isExternal>
          {website}
        </Link>
        <Text mt="5">{email ?? username}</Text>
        <Text mt="3" color="gray.700">
          Created 2 mins ago
        </Text>
      </Box>

      <NextLink href="/credentials/[id]" as={`/credentials/${id}`}>
        <Button
          w="full"
          bg="primary.500"
          color="white"
          rounded="md"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          size="lg"
          py="6"
        >
          View Details
        </Button>
      </NextLink>
    </Box>
  );
};

export default CredentialCard;
