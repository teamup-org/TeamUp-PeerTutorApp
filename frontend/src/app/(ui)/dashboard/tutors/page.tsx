import ResponsiveAppBar from '../../app-bar';
import TutorCard from '../../tutor-card';

import { Box, Container, Paper, Typography } from '@mui/material';
import { Dashboard, School, CalendarMonth } from '@mui/icons-material';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { name: 'Peer Tutors', href: '/dashboard/tutors', icon: School },
  { name: 'My Schedule', href: '/dashboard/schedule', icon: CalendarMonth },
];

export default function TutorPage() {
  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} />
      </header>
      <main>
        <Box position="relative" sx={{top: 50}}>
          <Container maxWidth="sm">
            
              <Typography variant="h2" align="center">
                <TutorCard/>
              </Typography>
            
          </Container>
        </Box>
      </main>
    </>
  );
}