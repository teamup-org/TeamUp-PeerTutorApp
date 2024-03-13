
import React from "react";

import { Dashboard, School, CalendarMonth } 
from '@mui/icons-material';

import ResponsiveAppBar from "@/app/(ui)/app-bar";

const links: Link[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { name: 'Peer Tutors', href: '/dashboard/tutors', icon: School },
  { name: 'My Schedule', href: '/dashboard/schedule', icon: CalendarMonth },
];

const settings: Link[] = [
  { name: 'Profile', href: '/dashboard/profile', icon: Dashboard },
  { name: 'Log Out', href: '/', icon: Dashboard },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <ResponsiveAppBar position="static" links={links} settings={settings}/>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}
