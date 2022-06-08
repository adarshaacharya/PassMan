import { SocialIcon } from 'react-social-icons';

type Props = {
  url: string;
};

const CredentialCover = ({ url }: Props) => {
  return <SocialIcon url={url} style={{ height: 90, width: 90 }} />;
};

export default CredentialCover;
