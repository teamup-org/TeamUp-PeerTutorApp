import ResponsiveAppBar from '../app-bar';

import { Dashboard, School, CalendarMonth } from '@mui/icons-material';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { name: 'Peer Tutors', href: '/dashboard/tutors', icon: School },
  { name: 'My Schedule', href: '/dashboard/schedule', icon: CalendarMonth },
];

export default function DashboardPage() {
  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} />
      </header>
      <main>
        Test
      </main>
    </>
  );
}
