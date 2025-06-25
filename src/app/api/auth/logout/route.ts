import { redirect } from 'next/navigation';
import { deleteSession } from '@/libs/utils/session.utils';

export const GET = async () => {
  await deleteSession();
  redirect('/login');
};
