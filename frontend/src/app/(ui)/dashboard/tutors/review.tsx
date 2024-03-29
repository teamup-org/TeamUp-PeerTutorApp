

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Stack, Avatar, Typography, IconButton, Rating, Box }
from '@mui/material';


export default function Review({ review }: { review: Review }) {
  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1} borderBottom={1} borderColor="divider">
          <Avatar sx={{ width: 50, height: 50 }} />

          <Stack direction="column" justifyItems="center">
            <Typography variant="h6" fontWeight="bold"> {review.tuteeEmail} </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Rating value={review.numberStars} readOnly />

              <Typography variant="body1" color="text.secondary"> 3/27/2024 </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box>
          <IconButton> <MoreVertIcon /> </IconButton>
        </Box>
      </Stack>

      <Box>
        <Typography paragraph variant="body1" whiteSpace="pre-wrap" noWrap>  
          { review.reviewText }
        </Typography>
      </Box>
    </Stack>
  );
}
