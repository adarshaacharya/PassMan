import { Button } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      Not signed in <br />
      <Button
        colorScheme="blue"
        type="button"
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
      >
        Sign in
      </Button>
      <Link href={'/dashboard'}>Dashboard</Link>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
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

export default Home;
