import { Vault } from '@/enums';
import useToast from '@/hooks/useToast';
import { getErrorMessage, HttpError } from '@/libs/client/errorHandler';
import { createCreditentialSchema } from '@/schemas';
import { createCreditential } from '@/services';
import { endpoints } from '@/services/endpoints';
import { CreateCredentialRequest } from '@/services/types';
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
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

type Props = {
  onClose: VoidFunction;
  isOpen: boolean;
  vaultCategory: Vault;
};

type CreateCredentialSchema = Omit<CreateCredentialRequest, 'category'>;

function CreateCredential({ isOpen, onClose, vaultCategory }: Props) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const initialRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCredentialSchema>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(createCreditentialSchema),
  });

  const { isLoading: isCredentialSubmitting, mutate: mutateCredential } =
    useMutation(createCreditential, {
      onSuccess: () => {
        queryClient.invalidateQueries(endpoints.credentials);

        onClose();
        showToast({
          title: 'Credential created',
          description: 'Your credential has been created',
          status: 'success',
        });
      },
      onError: (error: HttpError) => {
        const errorMessage = getErrorMessage(error);
        showToast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
        });
      },
    });

  const onSubmit = (values: CreateCredentialSchema) => {
    mutateCredential({
      ...values,
      category: vaultCategory,
    });
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen || isCredentialSubmitting}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xl"
      isCentered
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent maxW="500px">
        <ModalHeader textAlign="center">Create new credential</ModalHeader>
        <ModalCloseButton />
        <form id="create-credential-form" onSubmit={handleSubmit(onSubmit)}>
          <ModalBody p="8">
            <FormControl isRequired isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Enter email..."
                size="lg"
                {...register('email')}
              />
              <FormHelperText color="red">
                {errors?.email?.message}
              </FormHelperText>
            </FormControl>

            <FormControl isRequired isInvalid={Boolean(errors.username)}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="Enter username..."
                size="lg"
                {...register('username')}
              />
              <FormHelperText color="red">
                {errors?.username?.message}
              </FormHelperText>
            </FormControl>

            <FormControl isRequired isInvalid={Boolean(errors.website)}>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                type="url"
                id="website"
                placeholder="Enter website domain..."
                size="lg"
                {...register('website')}
              />
              <FormHelperText color="red">
                {errors?.website?.message}
              </FormHelperText>
            </FormControl>

            <FormControl isRequired isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Enter password..."
                size="lg"
                {...register('password')}
              />
              <FormHelperText color="red">
                {errors?.password?.message}
              </FormHelperText>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                placeholder="Enter description..."
                size="lg"
                {...register('description')}
              />
              <FormHelperText color="red">
                {errors?.description?.message}
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              form="create-credential-form"
              colorScheme="primary"
              mr={3}
              size="lg"
              type="submit"
              isLoading={isCredentialSubmitting}
            >
              Enter Credential
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

export default CreateCredential;
