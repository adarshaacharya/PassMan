import Link from 'next/link';
import { Button } from '@mantine/core';

export default function Demo() {
  return (
    <Link href="/hello" passHref>
      <Button component="a">Next link button</Button>
    </Link>
  );
}
