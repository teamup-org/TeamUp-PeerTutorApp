
import React from "react";

import ResponsiveAppBar from "../app-bar";
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} settings={settings}/>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}
