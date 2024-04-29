
// Define Authentication provider buttons here from Next-Auth.js


import Image from 'next/image';

import { signIn } 
  from 'next-auth/react';

import { Button, Typography } 
  from '@mui/material';

import googleLogo from '@/../public/google.png';


/**
 * @function React Component for the Google Login Provider
 * @returns JSX Component for the Google Login Provider
 */
export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn("google")} variant="contained">
      <Image src={googleLogo} alt="Google Logo" width={20} height={20}/>
      <Typography variant="body1"> Continue with Google </Typography>
    </Button>
  ); 
}