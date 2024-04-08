


import * as React from 'react';

import { ExpandLess, ExpandMore } 
  from '@mui/icons-material';
import { Stack, Typography, Avatar, Button, Box, ListItemButton, ListItemAvatar, ListItemText, Collapse }
  from '@mui/material';

import { toTitleCase, toDate }
  from '@/app/_lib/utils';


export default function PendingReview( { pendingReview, setPendingReview } : { pendingReview: PendingReview, setPendingReview: Function } ) {
  const [open, setOpen] = React.useState(false);
  
  const tutorName = toTitleCase(`${pendingReview.tutorFirstName} ${pendingReview.tutorLastName}`);
  const tutorInfo = `${pendingReview.tutorMajorAbbreviation.toUpperCase()} | ${toTitleCase(pendingReview.tutorSeniority)}`;

  const handleRatingBox = () => {
    setPendingReview(pendingReview);
  };


  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>

        <ListItemAvatar>
          <Avatar src={pendingReview.tutorPictureUrl} sx={{ width: 70, height: 70 }} />
        </ListItemAvatar>

        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold"> {tutorName} </Typography>} 
          secondary={<Typography variant="body1" color="text.secondary"> {tutorInfo} </Typography>}
          sx={{ ml: 2 }}
        />

        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography> Appointment: {toDate(new Date(pendingReview.endDateTimeString))} </Typography>

        <Stack direction="row" spacing={1} alignContent="center" justifyContent="end" pr={2}>
          <Button variant="contained" size="small" onClick={handleRatingBox}> Open Review </Button>
        </Stack>
      </Collapse>
    </>
  );
}
