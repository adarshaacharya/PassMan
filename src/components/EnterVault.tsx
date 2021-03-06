import { enterVault } from '@/services';
import { EnterVaultRequest } from '@/services/types';
import { Vault } from '@/enums';
import { getErrorMessage } from '@/libs/client/errorHandler';
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
  vaultCategory: Vault;
};

type EnterVaultSchema = Omit<EnterVaultRequest, 'category'>;

function EnterVault({ onClose, isOpen, vaultCategory }: Props) {
  const initialRef = React.useRef(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnterVaultSchema>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(enterVaultSchema),
  });
  const [isEnteringVault, setIsEnteringVault] = React.useState(false);

  const onSubmit = (values: EnterVaultSchema) => {
    if (!values) return;
    setIsEnteringVault(true);
    enterVault({
      key: values.key,
      category: vaultCategory,
    })
      .then(() => {
        //note: don't close the modal on success, otherrwise the user will be flickered with vaults page for a second
        router.push('/credentials');
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        setError('key', { type: 'manual', message: errorMessage });
      })
      .finally(() => {
        setIsEnteringVault(false);
      });
  };
  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen || isSubmitting}
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
              isLoading={isSubmitting || isEnteringVault}
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
