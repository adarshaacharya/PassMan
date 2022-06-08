import { createVault } from '@/apis';
import { Vault } from '@/enums';
import useToast from '@/hooks/useToast';
import { getErrorMessage } from '@/libs/client/errorHandler';
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
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  vaultCategory: Vault;
  isOpen: boolean;
  onClose: VoidFunction;
};

type CreatVaultForm = {
  key: string;
  keyConfirmation: string;
};

function CreateVault({ vaultCategory, isOpen, onClose }: Props) {
  const initialRef = React.useRef(null);
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatVaultForm>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(createVaultSchema),
  });

  const onSubmit = (values: CreatVaultForm) => {
    if (!values) return;
    const { key } = values;
    createVault({ key, category: vaultCategory })
      .then(() => {
        router.push('/credentials');
        showToast({
          description: 'Vault created successfully',
          status: 'success',
        });
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        showToast({
          description: errorMessage,
          status: 'error',
        });
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
        <ModalHeader px="10" textAlign="center">
          Enter super strong private key for vault . You won&apos;t be able to
          change private key, please note it properly.
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody p="8">
            <FormControl isRequired isInvalid={Boolean(errors.key)}>
              <FormLabel htmlFor="key">Enter super strong key </FormLabel>
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
            <FormControl
              isRequired
              mt={8}
              isInvalid={Boolean(errors.keyConfirmation)}
            >
              <FormLabel htmlFor="keyConfirmation">Re-enter key </FormLabel>
              <Input
                type="password"
                id="keyConfirmation"
                placeholder="Re-enter vault key..."
                size="lg"
                {...register('keyConfirmation')}
              />
              <FormHelperText color="red">
                {errors?.keyConfirmation?.message}
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
              Save
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

export default CreateVault;
