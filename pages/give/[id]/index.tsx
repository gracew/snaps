import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import SnapsRecipient from '../../../components/snapsRecipient';

const GiveToEdit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <SnapsRecipient />
  )
}

export default GiveToEdit;
