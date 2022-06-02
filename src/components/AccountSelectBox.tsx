import { accountSelectCards } from '@/consts';
import { Vault } from '@/enums';
import { Badge, Box, Heading, Icon, Text } from '@chakra-ui/react';
import * as React from 'react';

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

export default AccountSelectBox;
