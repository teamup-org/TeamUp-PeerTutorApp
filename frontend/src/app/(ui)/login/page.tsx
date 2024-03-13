'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } 
from "next/navigation"

import { useSession } 
from "next-auth/react"

import { GoogleSignInButton } 
from '@/app/(ui)/login/authButtons';

import { Container, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Paper} 
from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignIn() {
  const router = useRouter();

  const { data: session } = useSession()
  if (session) {
    return (<>{router.push('/dashboard')}</>);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              LinkComponent={Link}
              href="/dashboard"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <GoogleSignInButton />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
  }