import { Badge, Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

type Props = {
  title: string;
  description: string;
  isSupported?: boolean;
};

function AccountSelectBox({
  title,
  description,
  isSupported = true,
  ...rest
}: Props) {
  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
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
      {...rest}
    >
      {!isSupported && (
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
      <Text mt={8} color="gray.700">
        {description}
      </Text>
    </Box>
  );
}

function Dashboard() {
  return (
    //  From a usage standpoint, we don't recommend adding custom margins to the children of HStack, VStack or Stack.
    // If you ever need to, then maybe you don't need to use them and reach for Flex or use the shouldWrapChildren prop.
    <Stack
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      shouldWrapChildren
    >
      <Box>
        <Heading as="h1" size="2xl" color="gray.700">
          Choose Account Type
        </Heading>
      </Box>

      <HStack spacing={8} mt={8}>
        <AccountSelectBox
          title="Personal"
          description="You can use this account to store your personal information."
        />
        <AccountSelectBox
          title="Business"
          description=" You can use this account to store your passwords and manage your
            employees.."
          isSupported={false}
        />
      </HStack>
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
