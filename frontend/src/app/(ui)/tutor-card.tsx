'use client';

import * as React from 'react';

import { Stack, Card, CardContent, Typography, Divider, Avatar, Rating, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TutorCard() {
  const [value, setValue] = React.useState<number | null>(4);

  const handleClick = () => {
    console.info('Clicked chip.');
  };

  return (
    <Card sx={{py:2}}>
      <Stack direction="row" spacing={2} divider={ <Divider variant="middle" orientation="vertical" flexItem sx={{}} />  }>
        <Stack direction="column" flexGrow="2" spacing={1}>
          <Typography variant="h6">Kyle Lang</Typography>
          <center> <Avatar sx={{ width: 100, height: 100, }}/> </center>
            <Typography variant="h6">
              $14 / hr
              <center> <Divider variant="middle" orientation="horizontal" flexItem sx={{maxWidth:80}} /> </center>
            </Typography>
            <center> <Rating name="read-only" value={value} readOnly /> </center>
        </Stack>
        <Stack direction="column" flexGrow="5">
          <Typography variant="h6">Texas A&M UG Tutor</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="CSCE420" onClick={handleClick} color="primary" sx={{width:100}} />
            <Chip label="CSCE410" onClick={handleClick} color="primary" sx={{width:100}} />
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
