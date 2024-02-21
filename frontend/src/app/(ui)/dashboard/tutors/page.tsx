import ResponsiveAppBar from '../../app-bar';
import TutorCard from '../../tutor-card';
import tutors from '../../../(lib)/placeholder-data';

import { Box, Container, Paper, Typography } from '@mui/material';
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
  const printTutors = () => {
    for (var tutor in tutors) {
      <TutorCard />
    }
  }

  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} settings={settings} />
      </header>
      <main>
        <Box position="relative" marginTop="5%" >
          <Container maxWidth="sm">
            { 
              /*
              for (var tutor in tutors) => (
                <TutorCard />
              ) */
            }
          </Container>
        </Box>
      </main>
    </>
  );
}