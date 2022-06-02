import SignOut from '@/components/SignOut';
import { Vault } from '@/enums';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import {
  MdNavigateNext,
  MdOutlineBusinessCenter,
  MdPersonOutline,
} from 'react-icons/md';

const accountSelectCards = [
  {
    title: Vault.PERSONAL,
    description: 'Store your individual credentials of your home or office.',
    isReleased: true,
    icon: MdPersonOutline,
  },
  {
    title: Vault.BUSINESS,
    description:
      'Store credentials of your organization. Create user groups and share it with your teams.',
    isReleased: false,
    icon: MdOutlineBusinessCenter,
  },
];

type Props = {
  details: typeof accountSelectCards[number];
  selectedVault: Vault;
  handleClick: (Vault: Vault) => void;
};

function AccountSelectBox({
  details,
  selectedVault,
  handleClick,
  ...rest
}: Props) {
  const { title, description, isReleased, icon } = details;
  const isCardSelected = selectedVault === title;

  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      px="12"
      py="20"
      shadow="md"
      textAlign="center"
      cursor="pointer"
      position="relative"
      _hover={{
        borderColor: 'primary.300',
        backgroundColor: 'primary.50',
      }}
      background={isCardSelected ? 'primary.50' : 'white'}
      border={isCardSelected ? '1px' : 'none'}
      borderColor={isCardSelected ? 'primary.300' : 'gray.200'}
      onClick={() => handleClick(title)}
      {...rest}
    >
      {!isReleased && (
        <Badge
          borderRadius="full"
          colorScheme="orange"
          p="2"
          alignSelf="center"
          position="absolute"
          top="4"
          right="2"
        >
          Not released
        </Badge>
      )}
      <Icon as={icon} w={20} h={20} color="gray.700" />
      <Heading fontSize="3xl" color="gray.700">
        {title}
      </Heading>
      <Text mt={8} color="gray.700" fontSize="2xl">
        {description}
      </Text>
    </Box>
  );
}

function Dashboard() {
  const [selectedVault, setSelectedVault] = React.useState<Vault>(
    Vault.PERSONAL,
  );

  const handleAccountCardClick = React.useCallback((vault: Vault) => {
    setSelectedVault(vault);
  }, []);

  const handleVaultCreate = React.useCallback(() => {
    console.log('handleVaultCreate', selectedVault);
  }, [selectedVault]);

  return (
    //  From a usage standpoint, we don't recommend adding custom margins to the children of HStack, VStack or Stack.
    // If you ever need to, then maybe you don't need to use them and reach for Flex or use the shouldWrapChildren prop.
    <Stack
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      shouldWrapChildren
    >
      <SignOut />
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
          onClick={handleVaultCreate}
        >
          Next
        </Button>
      </Flex>
    </Stack>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
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

export default Dashboard;
