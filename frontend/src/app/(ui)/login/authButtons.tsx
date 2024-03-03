import Image from 'next/image';

import { signIn } from 'next-auth/react';
import googleLogo from '@/../public/google.png';

import { Button, Typography } from '@mui/material';

export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn("google")} variant="contained">
      <Image src={googleLogo} alt="Google Logo" width={20} height={20}/>
      <Typography variant="body1"> Continue with Google </Typography>
    </Button>
  ); 
}