
import { Stack, Typography, Avatar, Box, Button, Divider }
  from '@mui/material';

import { toTitleCase, toDate }
  from '@/app/_lib/utils';


export default function PendingReview( { pendingReview, setPendingReview } : { pendingReview: Appointment, setPendingReview: Function } ) {
  const handleRatingBox = () => {
    setPendingReview(pendingReview);
  };


  return (
    <Stack direction="row" alignItems="center" spacing={1} borderBottom={1} borderColor="divider" pb={1}>
      <Avatar src="" sx={{ width: 90, height: 90 }} />

          {/* Name OVER Date */}
          <Stack direction="column" justifyItems="center">

            {/* Tutor Info */}
            <Stack direction="row" alignItems="center" spacing={1} divider={ <Divider orientation="vertical" sx={{ height: 20 }} /> }>
              <Typography variant="h6" fontWeight="bold"> { toTitleCase(`${pendingReview.tutorFirstName} ${pendingReview.tutorLastName}`) } </Typography>
              
              <Typography variant="body1" color="text.secondary">CSCE{ /*pendingReview.tutorMajorAbbreviation.toUpperCase()*/ } </Typography>
              <Typography variant="body1" color="text.secondary">Freshman{ /*toTitleCase(pendingReview.tuteeSeniority)*/ } </Typography>
            </Stack>

            {/* Date */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1" color="text.secondary"> 
                {`From Appointment: `}
                { toDate(new Date(pendingReview.endDateTimeString)) }
              </Typography>
            </Stack>

            <Stack direction="row">
              <Button variant="contained" onClick={handleRatingBox}> Open Review </Button>
            </Stack>
          </Stack>


    </Stack>
  );
}
