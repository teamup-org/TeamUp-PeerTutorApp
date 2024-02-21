import ResponsiveAppBar from '../../app-bar';
import TutorCard from '../../tutor-card';
import { tutors } from '../../../(lib)/placeholder-data';

import { Box, Container, Grid } from '@mui/material';
import { Dashboard, School, CalendarMonth } from '@mui/icons-material';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { name: 'Peer Tutors', href: '/dashboard/tutors', icon: School },
  { name: 'My Schedule', href: '/dashboard/schedule', icon: CalendarMonth },
];

const settings = [
  { name: 'Profile', href: '/dashboard/profile', icon: Dashboard },
  { name: 'Log Out', href: '/', icon: Dashboard },
];

export default function TutorPage() {
  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} settings={settings} />
      </header>
      <main>
        <Box position="fixed" marginTop="5%" >
          <Container maxWidth="xl">
            <Grid container direction="row" justifyItems="flex-start" alignItems="flex-start" spacing={2} >
              { 
                tutors.map((tutor: any) => (
                  <Grid item md={4}>
                    <TutorCard tutor={tutor} />
                  </Grid>
                ))
              }
            </Grid>
          </Container>
        </Box>
      </main>
    </>
  );
}