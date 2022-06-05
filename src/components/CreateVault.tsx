import { createVaultSchema } from '@/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
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
import * as React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

type CreatVaultForm = {
  key: string;
  keyConfirmation: string;
};

function CreateVault({ isOpen, onClose }: Props) {
  const initialRef = React.useRef(null);
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
        <ModalHeader>
          Since this is your first time creating vault please create private ky
          and remember it.
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
