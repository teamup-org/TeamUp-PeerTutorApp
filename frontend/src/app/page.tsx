'use client';

import { Box, Container, Typography, Paper } 
from '@mui/material';
import { Login, HowToReg } 
from '@mui/icons-material';

import ResponsiveAppBar from '@/app/(ui)/app-bar';

const links = [
  {name: 'Login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
];

export default function LandingPage() {
  return (
    <>
      <header>
        <ResponsiveAppBar links={links} settings={[]} />
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
