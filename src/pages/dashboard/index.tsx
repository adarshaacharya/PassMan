import { Button } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Dashboard() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div>
      <h1>Dashboard {user?.name}</h1>
      Signed in as {user?.name} <br />
      <Image src={String(user?.image)} alt="mine" width={200} height={200} />
      <Button colorScheme="red" type="button" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
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

export default Dashboard;
