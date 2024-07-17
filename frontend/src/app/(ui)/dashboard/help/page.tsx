'use client';

import { Box, Typography, Button, Divider, Stack, TextField, InputAdornment, Card, CardContent, Grid }
  from '@mui/material'
import { Login, HowToReg, Search, Speed,  CalendarMonth, Email, ContentCopy}
  from '@mui/icons-material'
import ContactForm from '@/app/(ui)/dashboard/help/contact-form'

// Links for buttons in app bar on the landing page
const links = [
  {name: 'Login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
];

/**
 * @function React Component for Help/Contact page
 * @returns 
 */

export default function ContactPage() {

  return (
    <>
      <main>
        <Stack direction="column" width="100%" height="100%" spacing={6} alignItems="center" pb = {4}>
          <Stack bgcolor="#e0e0e0" width="100%" sx={{ flexDirection: {xs:"column", md:"row"} }} justifyContent="center" alignItems="center" p={4} spacing={4}>
            <Stack direction="row" width="40%" spacing={2}>
              <TextField label="Search" size="small" fullWidth variant="outlined" InputProps={{ startAdornment:(<InputAdornment position="start"> <Search/> </InputAdornment>), }}/>
            </Stack>
          </Stack>

          <Typography variant="h3"> <strong> Contact Us! </strong> </Typography>

          <Grid container justifyContent="space-evenly" alignItems="stretch">
            <Grid item xs={5} md={4}>
              <Card variant="outlined" sx={{ height:'100%' }}>
                <CardContent sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <Speed sx={{ fontSize:'500%' }}/>
                  <Typography variant="h5">
                    <strong> SPEED </strong>
                  </Typography>
                  <Typography variant="body1">
                    We will get back to you with the briefest possible delay.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={5} md={4}>
              <Card variant="outlined" sx ={{ height: '100%' }}>
                <CardContent sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <CalendarMonth sx={{ fontSize:'500%' }}/>
                  <Typography variant="h5">
                  <strong> AVAILABILITY </strong>
                  </Typography>
                  <Typography variant="body1">
                    We are available from Monday to Friday.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider variant="middle" orientation="horizontal" sx={{ width:'75%' }} /> 

          <Stack display="flex" flexDirection="column" spacing={2}>

            <Box mx="auto" textAlign="center">
              <Email sx={{ fontSize: '500%' }} />
              <Typography align="center" variant="h3"> 
                <strong> Email Us! </strong>
              </Typography>

              <Typography variant="h5" align="center" mt={2}> 
                <strong> Whether you find a glitch, or have feedback to share, just send us an email below! </strong>
              </Typography>

            </Box>

            <ContactForm />
        
          </Stack>

      </Stack>
      </main>
    </>
  );
}
