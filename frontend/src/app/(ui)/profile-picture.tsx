import { authConfig } from '@/app/(lib)/auth';
import { getServerSession } from 'next-auth';

import { Avatar } from '@mui/material';

export default async function ProfilePicture() {
  'use server';

  const session = await getServerSession(authConfig);
  
  return (
    <>
      {session?.user?.image && <Avatar src={session?.user?.image} alt="" />}
      {console.log(session?.user?.image)}
    </>
  );
}
