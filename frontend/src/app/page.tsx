'use client';

import ResponsiveAppBar from './(ui)/app-bar'

import { Box, Container, Typography, Paper, Grid, Button } from '@mui/material'
import { Login, HowToReg, CenterFocusStrong } from '@mui/icons-material'
import { Nunito_Sans } from 'next/font/google';

const links = [
  {name: 'Login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
];
const nunito_sans = Nunito_Sans({ subsets: ['latin'], weight: ['600', '700', '800', '900', '1000'], });

export default function LandingPage() {
  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} />
      </header>
      <main>
        <Box bgcolor="#e0e0e0">
          <Box py={24}>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={6}> 
                <Box textAlign="left" width="75%">
                  <div style={{display:"flex"}}>
                    <Typography gutterBottom color='secondary' sx={{ fontSize: { xs: '1.5rem', sm: '3rem' }, fontFamily: nunito_sans, fontWeight: 'bold'}} display='inline'>
                      Find Peer Tutors With Experience In <Typography color='primary' sx={{ fontSize: { xs: '1.5rem', sm: '3rem' }, fontFamily: nunito_sans, fontWeight: 'bold'}} display='inline'>Your Course</Typography>.
                    </Typography>
                  </div>
                  <Button variant="contained" color="secondary"><Typography color='primary' sx={{ fontSize: { xs: '.75rem', sm: '1.5rem' }, fontWeight: 'bold'}}>Sign Up</Typography></Button>
                </Box>
              </Grid>
              <Grid item xs={4}> 
                <Box display="flex" justifyContent="center">
                  <img src="/landingpage.png" alt="Your Image" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box width="70%" mx="auto" textAlign="center" my={4}> 
            <Box borderBottom="2px solid #333" width="100%" mx="auto" my={4} /> 
            <Typography align="center" mt={2} sx={{ fontSize: '40px', fontWeight: 'bold'}}> 
              Our Mission
            </Typography>
            <Typography variant="h5" align="center" mt={2} sx={{ fontWeight: 'bold'}}> 
              Theo is an online tutoring marketplace within university domains where students can turn subject matter expertise into a side hustle. 
            </Typography>
            <Typography variant="h5" align="center" mt={2} sx={{ fontWeight: 'bold'}}> 
              By handling bookings and scheduling on their behalf, the tool allows enrolled tutors to focus on teaching while getting discovered by relevant tutees seeking specific course guidance. 
            </Typography>
          </Box>
        </Box>
      </main>
    </>
  );
}
