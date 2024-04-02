
import * as React from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Stack, Avatar, Typography, IconButton, Rating, Box, TextField, Button, Divider }
from '@mui/material';

import { useSession } from 'next-auth/react';

import { toDate, toTitleCase } from '@/app/_lib/utils';
import { TableFetch, TablePush, TableUpdate } from '@/app/_lib/data';


const temp: Review = 
{ 
  appointmentId: 0, numberStars: 0, reviewText: "", reviewDateString: "",
  tuteePictureUrl: "", tuteeEmail: "", tuteeFirstName: "", tuteeLastName: "", tuteeSeniority: "", tuteeMajorAbbreviation: "",
  tutorEmail: "" 
}


export default function Review(
  { review = temp, pendingReview, editable = false, }: 
  { review?: Review , pendingReview?: PendingReview, editable?: boolean }
){
  const [rating, setRating] = React.useState<number | null>(0);
  const [userReview, setUserReview] = React.useState("");

  const session = useSession();
    const pfp = session.data?.user?.image ? session.data.user.image : "";
    const email = session.data?.user?.email ? session.data.user.email : "";
  const today = new Date();


  const mutation = TablePush("/tutor_review");

  const handleUserReviewSubmission = () => {
    pendingReview &&
    mutation.mutate(
      {
        appointment_id: pendingReview.appointmentId,
        number_stars: rating,
        review_text: userReview,

        tutee_email: email,
        tutor_email: pendingReview.tutorEmail,
      }
    );
  };


  return (
    <Stack direction="column" spacing={1}>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* PFP/Name/Rating/Date row */}
        <Stack direction="row" alignItems="center" spacing={1} borderBottom={1} borderColor="divider" pb={1}>
          <Avatar src={!editable ? review.tuteePictureUrl : pfp} sx={{ width: 50, height: 50 }} />

          {/* Name OVER Rating/Date */}
          <Stack direction="column" justifyItems="center">

            {/* Tutee Info */}
            <Stack direction="row" alignItems="center" spacing={2} divider={<Divider orientation="vertical" sx={{ height: 20 }} />}>
              <Typography variant="h6" fontWeight="bold"> {!editable ? toTitleCase(`${review.tuteeFirstName} ${review.tuteeLastName}`) : session?.data?.user?.name} </Typography>
                { !editable && <Typography variant="body1" color="text.secondary"> {review.tuteeMajorAbbreviation.toUpperCase()} </Typography> }
                { !editable && <Typography variant="body1" color="text.secondary"> {toTitleCase(review.tuteeSeniority)} </Typography> }
            </Stack>

            {/* Rating/Date */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Rating aria-required value={!editable ? review.numberStars : rating} onChange={(event, value) => setRating(value)} readOnly={!editable} />

              <Typography variant="body1" color="text.secondary"> {!editable ? toDate(new Date(review.reviewDateString)) : toDate(today)} </Typography>
            </Stack>
          </Stack>

        </Stack>

        {/* EOL Menu Icon OR Submit button */}
        { 
          !editable ?
          (
            <Box>
              <IconButton> <MoreVertIcon /> </IconButton>
            </Box>
          ) :
          (
            <Stack direction="row">
              <Button variant="contained" disabled={!userReview.length} onClick={handleUserReviewSubmission}> Submit Review </Button>
            </Stack>
          )
        }
      </Stack>
      
      {/* Review text OR Review input */}
      
        { !editable ? 
          (
            <Typography paragraph variant="body1" whiteSpace="pre-wrap" noWrap>  
              { review.reviewText }
            </Typography>
          ) : 
          (
            <TextField required multiline
              value={userReview} onChange={(event) => setUserReview(event.target.value)} 
              id="user-review" label="User Review" 
              fullWidth margin="dense" 
            />
          )
        }
      

    </Stack>
  );
}
