'use client';

import * as React from 'react';

import Image from 'next/image';

import { useSession, signOut }
from 'next-auth/react';

import { Box, Menu, MenuItem, Typography, Tooltip, IconButton, Avatar, Link }
from '@mui/material';

const settings = [ 'Profile', 'Log Out' ];

export default function UserMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    await signOut();
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    
  };

  const { data: session, status } = useSession();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          { session && 
            <Avatar src={session?.user?.image?.toString()} alt="" />
          }
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* {settings.map((setting) => (
            <MenuItem key={setting} onClick={setting === 'Log Out' ? handleLogOut : handleProfile}>
              <Typography variant="inherit" textAlign="center">
                {setting}
              </Typography>
            </MenuItem>
          ))} */}
        <MenuItem key={settings[0]} component={Link} href={'dashboard/profile'}>
          <Typography variant="inherit" textAlign="center">
            {settings[0]}
          </Typography>
        </MenuItem>
        <MenuItem key={settings[1]} onClick={handleLogOut} >
          <Typography variant="inherit" textAlign="center">
            {settings[1]}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}