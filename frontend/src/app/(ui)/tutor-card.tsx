'use client';

import { Stack, Card, CardContent, Typography, Divider, Avatar, Rating, Chip } from '@mui/material';

export default function TutorCard() {
  const handleClick = () => {
    console.info('Clicked chip.');
  };

  return (
    <Card elevation={4} sx={{ p:2, }}>
      <Stack direction="row">
        <Stack direction="column" alignItems="center" spacing={1}>
          <Typography variant="h6">Kyle Lang</Typography>

            <Avatar sx={{ width: 100, height: 100, }}/>

            <Typography variant="h6" width="100%" sx={{ fontWeight: 'bold' }}>
              $14 / hr
              <Divider variant="middle" orientation="horizontal" flexItem sx={{  }} />
            </Typography>

            <Stack direction="column" alignItems="center">
              <Rating name="read-only" value={4} readOnly />
              <Typography variant="body1" sx={{ fontSize: 10, fontWeight: 'bold' }}> (12) </Typography>
            </Stack>
        </Stack>

        <Divider variant="middle" orientation="vertical" flexItem sx={{ mx: 2, }} />

        <Stack direction="column" spacing={1}>
          <Typography variant="h6" align="left">Texas A&M UG Tutor</Typography>

          <Stack direction="row" spacing={1}>
            <Chip label="CSCE420" onClick={handleClick} color="error" sx={{ width:100, }} />
            <Chip label="CSCE410" onClick={handleClick} color="error" sx={{ width:100, }} />
          </Stack>

          <Typography align="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
