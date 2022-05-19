import Link from 'next/link';

export default function Demo() {
  return (
    <Link href="/hello" passHref>
      Hello world
    </Link>
  );
}
