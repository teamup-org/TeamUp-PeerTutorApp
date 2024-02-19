'use client';

import ResponsiveAppBar from './(ui)/app-bar'
import { Login, HowToReg } from '@mui/icons-material'

const links = [
  {name: 'login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
];

export default function LandingPage() {
  return (
    <>
      <header>
        <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} />
      </header>
      <main>
        test
      </main>
    </>
  );
}
