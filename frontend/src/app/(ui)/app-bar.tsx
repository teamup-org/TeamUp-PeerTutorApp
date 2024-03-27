'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } 
from 'next/navigation';

import { AppBar, Box, Toolbar, IconButton, Menu, Container, Button, MenuItem, Stack, Typography } 
from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import TheoLogo from '@/app/(ui)/theo-logo';
import UserMenu from '@/app/(ui)/user-menu';

type AppBarProps = { links: Link[], settings: Link[] };
export default function ResponsiveAppBar(props : AppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="tertiary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <TheoLogo flexGrow="1"/>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="primary">
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
              (props.links).map((link: Link) => (
              <MenuItem key={link.name} onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                  <Button key={link.name} component={Link} href={link.href} fullWidth sx={{ p: 3 }}>
                    <link.icon />
                    { link.name }
                  </Button>
              </MenuItem>
              ))
            }
            </Menu>
          </Box>
          
          <Stack direction="row" my={0} spacing={2} display={{ xs: "none", md: "flex" }}>
            {
              (props.links).map((link: Link) => {
                let LinkIcon = link.icon;
                return (
                  <Button key={link.name} onClick={handleCloseNavMenu} component={Link} href={link.href}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <LinkIcon fontSize="medium" />
                      <Typography variant="body1"> {link.name} </Typography>
                    </Stack>
                  </Button>
                );
              })
            }

            { (usePathname().startsWith("/dashboard")) && <UserMenu /> }
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
