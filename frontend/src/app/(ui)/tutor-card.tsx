'use client';

import { Stack, Card, CardContent, Typography, Divider, Avatar, Rating, Chip } from '@mui/material';

export default function TutorCard(props: any) {
  const handleClick = () => {
    console.info('Clicked chip.');
  };

  return (
    <Card elevation={4} sx={{ p: 2, }}>
      <Stack direction="row">
        <Stack direction="column" alignItems="center" spacing={1}>
          <Typography variant="h6" noWrap>{props.tutor.name}</Typography>

            <Avatar sx={{ width: 100, height: 100, }}/>

            <Typography variant="h6" width="100%" sx={{ fontWeight: 'bold' }}>
              {props.tutor.rate}
              <Divider variant="middle" orientation="horizontal" flexItem sx={{  }} />
            </Typography>

            <Stack direction="column" alignItems="center">
              <Rating name="read-only" value={props.tutor.rating} readOnly />
              <Typography variant="body1" sx={{ fontSize: 10, fontWeight: 'bold' }}> ({props.tutor.rating_count}) </Typography>
            </Stack>
        </Stack>

        <Divider variant="middle" orientation="vertical" flexItem sx={{ mx: 2, }} />

        <Stack direction="column" spacing={1}>
          <Typography variant="h6" align="left">{props.tutor.title}</Typography>

          <Stack direction="row" spacing={1}>
            <Chip label="CSCE420" onClick={handleClick} color="error" sx={{ width:100, }} />
            <Chip label="CSCE410" onClick={handleClick} color="error" sx={{ width:100, }} />
          </Stack>

          <Typography align="left">
            {props.tutor.description}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
