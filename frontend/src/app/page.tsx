'use client';

import ResponsiveAppBar from './(ui)/app-bar'

import Link from 'next/link';

import { Box, Container, Typography, Paper, Button } from '@mui/material'
import { Login, HowToReg } from '@mui/icons-material'

const links = [
  {name: 'Login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
];

export default function LandingPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} />
      </header>
      <main>
        <Box position="relative" sx={{top: 50}}>
          <Container maxWidth="sm">
            <Paper elevation={4} sx={{mt:5}}>
              <Typography variant="h2" align="center">
                Landing Page
              </Typography>
            </Paper>
          </Container>
        </Box>
      </main>
    </>
  );
}
