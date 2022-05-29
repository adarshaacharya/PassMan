import SignOut from '@/components/SignOut';
import { AccountType } from '@/enums';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import { MdNavigateNext } from 'react-icons/md';

const accountSelectCards = [
  {
    title: AccountType.PERSONAL,
    description: 'You can use this account to store your personal information.',
    isReleased: true,
  },
  {
    title: AccountType.BUSINESS,
    description:
      'You can use this account to store your passwords and manage your employees',
    isReleased: false,
  },
];

type Props = {
  title: AccountType;
  description: string;
  isReleased?: boolean;
  selectedAccountType: AccountType;
  handleClick: (accountType: AccountType) => void;
};

function AccountSelectBox({
  title,
  description,
  isReleased = true,
  selectedAccountType,
  handleClick,
  ...rest
}: Props) {
  const isCardSelected = selectedAccountType === title;

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
      <Heading fontSize="3xl" color="gray.800">
        {title}
      </Heading>
      <Text mt={8} color="gray.700" fontSize="2xl">
        {description}
      </Text>
    </Box>
  );
}

function Dashboard() {
  const [selectedAccountType, setSelectedAccountType] =
    React.useState<AccountType>(AccountType.PERSONAL);

  const handleAccountCardClick = React.useCallback(
    (accountType: AccountType) => {
      setSelectedAccountType(accountType);
      console.log('handleAccountCardClick', accountType);
    },
    [],
  );

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
        Choose Account Type
      </Heading>
      <SimpleGrid spacing={8} mt={8} columns={{ base: 1, md: 2 }}>
        {accountSelectCards.map((card, index) => (
          <AccountSelectBox
            key={index}
            title={card.title}
            description={card.description}
            isReleased={card.isReleased}
            handleClick={handleAccountCardClick}
            selectedAccountType={selectedAccountType}
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
