'use client';

import * as React from 'react';

import { useSession, signOut }
from 'next-auth/react';

import { Box, Menu, MenuItem, Typography, Tooltip, IconButton, Avatar }
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

  const { data: session, status } = useSession();

  return (
    <Box sx={{ flexGrow: 0 }}>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {session && <Avatar src={session?.user?.image?.toString()} alt="" />}
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
      {settings.map((setting) => (
          <MenuItem key={setting} onClick={setting === 'Log Out' ? handleLogOut : handleCloseUserMenu}>
            <Typography variant="inherit" textAlign="center">
              {setting}
            </Typography>
          </MenuItem>
        ))}
    </Menu>
  </Box>
  );
}