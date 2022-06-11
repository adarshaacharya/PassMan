import { Creds } from '@/types';
import { Box, Text } from '@chakra-ui/react';
import CredentialCover from './CredentialCover';

const CredentialCard = ({ credential }: { credential: Creds }) => {
  return (
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
  );
};

export default CredentialCard;
