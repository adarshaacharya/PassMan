import { endpoints } from '@/apis/endpoints';
import { EnterVaultRequest } from '@/apis/types';
import { getErrorMessage } from '@/libs/client/errorHandler';
import HttpClient from '@/libs/client/HttpClient';
import { enterVaultSchema } from '@/schemas';
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
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onClose: VoidFunction;
  isOpen: boolean;
};

function EnterVault({ onClose, isOpen }: Props) {
  const initialRef = React.useRef(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnterVaultRequest>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(enterVaultSchema),
  });

  const onSubmit = (values: EnterVaultRequest) => {
    HttpClient.post(endpoints.vaults.enter, values)
      .then(() => {
        onClose();
        router.push('/credentials');
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        setError('key', { type: 'manual', message: errorMessage });
      });
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
        <ModalHeader textAlign="center">
          Since, you have already created your vault please enter vault key
        </ModalHeader>
        <ModalCloseButton />
        <form id="enter-vault-form" onSubmit={handleSubmit(onSubmit)}>
          <ModalBody p="8">
            <FormControl isRequired isInvalid={Boolean(errors.key)}>
              <FormLabel htmlFor="key">Enter Vault Key</FormLabel>
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
              form="enter-vault-form"
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
