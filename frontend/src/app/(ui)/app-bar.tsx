'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, Avatar } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';

import TheoLogo from './theo-logo';
import UserMenu from '@/app/(ui)/dashboard/user-menu';

export default function ResponsiveAppBar(props: any) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" color="tertiary" >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <TheoLogo flexGrow="1"/>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            { 
              (props.links).map((link: any) => (
              <MenuItem key={link.name} onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                  <Button key={link.name} component={Link} href={link.href} fullWidth sx={{ p: 3 }}>
                      <link.icon />
                      {link.name}
                  </Button>
              </MenuItem>
              ))
            }
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {
              (props.links).map((link: any) => {
                let LinkIcon = link.icon;
                return (
                  <Button
                    key={link.name}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={link.href}
                    sx={{ my: 2, display: 'block' }}
                  >
                    <LinkIcon />
                    {link.name}
                  </Button>
                );
              })
            }
          </Box>
          
          { (usePathname() === "/dashboard") && 
            (
              <UserMenu />
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
