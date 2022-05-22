import { signIn, signOut, getSession } from 'next-auth/react';
import { Button } from '@chakra-ui/react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Home = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = session?.user;

  if (user) {
    return (
      <>
        Signed in as {user.name} <br />
        <Image src={String(user.image)} alt="mine" width={200} height={200} />
        <Button colorScheme="red" type="button" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <Button colorScheme="blue" type="button" onClick={() => signIn('github')}>
        Sign in
      </Button>
      <Link href={'/dashboard'}>Dashboard</Link>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Home;
