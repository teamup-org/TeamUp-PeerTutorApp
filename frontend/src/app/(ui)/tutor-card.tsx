'use client';

import { Stack, Card, CardContent, Typography, Divider, Avatar, Rating, Chip } from '@mui/material';

export default function TutorCard(props: any) {
  const handleClick = () => {
    console.info('Clicked chip.');
  };

  const printChips = () => {
    return props.tutor?.courses?.map((course: {id: number, course: string}) => (
      <Chip label={course.course} onClick={handleClick} color="error" sx={{ width:100, }} key={course.id}/>
    ));
  };

  return (
    <Card elevation={4} sx={{ p: 2 }}>
      <Stack direction="row">
        <Stack direction="column" alignItems="center" spacing={1} width="20%">
          <Typography variant="h6"> <center> {props.tutor?.firstName + " " + props.tutor?.lastName} </center> </Typography>

          <Avatar sx={{ width: 100, height: 100, }}/>

          <Typography variant="h6" width="100%" sx={{ fontWeight: 'bold' }}>
            <center> ${props.tutor?.payRate} / hr </center>
            <Divider variant="middle" orientation="horizontal" flexItem/>
          </Typography>

          <Stack direction="column" alignItems="center">
            <Rating name="read-only" value={props.tutor?.rating} precision={0.5} readOnly/>
            <Typography variant="body1" sx={{ fontSize: 10, fontWeight: 'bold' }}> ({props.tutor?.ratingCount}) </Typography>
          </Stack>
        </Stack>

        <Divider variant="middle" orientation="vertical" flexItem sx={{ mx: 2, }}/>

        <Stack direction="column" spacing={1}>
          <Typography variant="h6" align="left"> Texas A&M Undergraduate Student </Typography>

          <Stack direction="row" spacing={1}>
            { printChips() }
          </Stack>

          <Typography align="left">
            {props.tutor?.bioText}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
