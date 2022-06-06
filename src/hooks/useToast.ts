import { useToast as useChakraToast } from '@chakra-ui/react';
import React from 'react';

type Status = 'success' | 'error' | 'warning' | 'info';

function useToast() {
  const toast = useChakraToast();

  const showToast = React.useCallback(
    ({ description, status }: { description: string; status: Status }) => {
      toast({
        size: 'lg',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
        variant: 'top-accent',
        status,
        description,
      });
    },
    [toast],
  );

  return {
    showToast,
  };
}

export default useToast;
