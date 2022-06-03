import { createVaultSchema } from '@/schemas';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onClose: VoidFunction;
  isOpen: boolean;
};

type EnterVaultForm = {
  key: string;
};

function EnterVault({ onClose, isOpen }: Props) {
  const initialRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnterVaultForm>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(createVaultSchema),
  });

  const onSubmit = (values: EnterVaultForm) => {
    if (!values) return;
    console.log({ values });
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xl"
      isCentered
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent maxW="500px">
        <ModalHeader>Enter private key for vault</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody p="8">
            <FormControl isRequired isInvalid={Boolean(errors.key)}>
              <FormLabel htmlFor="key">Enter vault key </FormLabel>
              <Input
                type="password"
                id="key"
                placeholder="Enter vault key..."
                size="lg"
                {...register('key')}
              />
              <FormHelperText color="red">
                {errors?.key?.message}
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="primary"
              mr={3}
              size="lg"
              type="submit"
              isLoading={isSubmitting}
            >
              Enter Vault
            </Button>
            <Button onClick={onClose} size="lg">
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EnterVault;
