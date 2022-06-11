import { Creds } from '@/types';
import { Box, Button, Link, Text, useColorModeValue } from '@chakra-ui/react';
import CredentialCover from './CredentialCover';
import { useRouter } from 'next/router';

const CredentialCard = ({ credential }: { credential: Creds }) => {
  const { id, website, email, username } = credential;
  const router = useRouter();
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
      <Box py="10">
        <Link href={website} color="blue.700" isExternal>
          {website}
        </Link>
        <Text mt="5">{email ?? username}</Text>
      </Box>

      <Button
        rounded="md"
        w="full"
        bg="primary.500"
        color="white"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        size="lg"
        py="6"
        onClick={() => router.push(`/credentials/${id}`)}
      >
        View Details
      </Button>
    </Box>
  );
};

export default CredentialCard;
