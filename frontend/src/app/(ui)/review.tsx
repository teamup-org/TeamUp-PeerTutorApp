

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Stack, Avatar, Typography, IconButton, Rating, Box }
from '@mui/material';


export default function Review() {
  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} borderBottom={1} borderColor="divider">
          <Avatar sx={{ width: 50, height: 50 }} />

          <Stack direction="column" justifyItems="center">
            <Typography variant="h6" fontWeight="bold"> Name </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Rating />
              <Typography variant="body1"> Date </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box alignSelf="end">
          <IconButton> <MoreVertIcon /> </IconButton>
        </Box>
      </Stack>

      <Box>
        <Typography> Body </Typography>
      </Box>
    </Stack>
  );
}
