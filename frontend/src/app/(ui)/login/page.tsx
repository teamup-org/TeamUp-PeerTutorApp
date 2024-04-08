'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } 
  from "next/navigation"

import { useSession } 
  from "next-auth/react"

import { Container, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Paper} 
  from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { GoogleSignInButton } 
  from '@/app/(ui)/login/authButtons';
import { TableFetch }
  from '@/app/_lib/data';





export default function SignIn() {
  ////////////////
  const session = useSession();
  const email = session.data?.user?.email;

  const { data: tutorData, isFetching: tutorIsFetching } = TableFetch<TutorQuery>("tutor", [email], `email_contains=${email}`);
  const { data: tuteeData, isFetching: tuteeIsFetching } = TableFetch<TuteeQuery>("tutee", [email], `email_contains=${email}`);

  if (session.status === "authenticated") {
    const route = useRouter();

    // If registered as tutor/tutee, redirect to /dashboard
    if (tutorData?.data.length || tuteeData?.length) {
      route.push("/dashboard");
    }
    
    // Else if not registered, redirect to /register
    if (!tutorIsFetching && !tuteeIsFetching) route.push("/register");
  }
  ////////////////

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
        <Box mt={8} p={4} display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/*
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
            */}
            <GoogleSignInButton />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
  }