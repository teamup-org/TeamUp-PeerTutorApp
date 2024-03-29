
import * as React from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Stack, Avatar, Typography, IconButton, Rating, Box, TextField }
from '@mui/material';

import { useSession } from 'next-auth/react';

import { toDate } from '@/app/_lib/utils';


const temp: Review = { appointmentId: 0, numberStars: 0, reviewText: "", tuteeEmail: "", tutorEmail: "" }


export default function Review({ review = temp, editable = false }: { review?: Review , editable?: boolean }) {
  const [rating, setRating] = React.useState<number | null>(0);

  const session = useSession();
  const pfp = session.data?.user?.image ? session.data.user.image : "";

  const today = new Date();


  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1} borderBottom={1} borderColor="divider">
          <Avatar src={!editable ? "" : pfp} sx={{ width: 50, height: 50 }} />

          <Stack direction="column" justifyItems="center">
            <Typography variant="h6" fontWeight="bold"> {!editable ? review.tuteeEmail : session?.data?.user?.name} </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Rating value={!editable ? review.numberStars : rating} onChange={(event, value) => setRating(value)} readOnly={!editable} />

              <Typography variant="body1" color="text.secondary"> {!editable ? "3/27/2024" : toDate(today)} </Typography>
            </Stack>
          </Stack>
        </Stack>

        { 
          !editable &&
          <Box>
            <IconButton> <MoreVertIcon /> </IconButton>
          </Box>
        }
      </Stack>

      <Box>
        { !editable ? (
            <Typography paragraph variant="body1" whiteSpace="pre-wrap" noWrap>  
              { review.reviewText }
            </Typography>
          ) : (
            <TextField required id="user-review" label="User Review" />
          )
        }
      </Box>
    </Stack>
  );
}
