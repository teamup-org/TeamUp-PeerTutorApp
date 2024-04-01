
import { Box, Container, Grid, Stack, Paper, Typography } 
from '@mui/material';

export default function DashboardPage() {
  return (
    <Box position="relative" sx={{top: 50}}>
      <Container maxWidth="lg">
        
        <Grid container>
          <Grid item md={8}>

          </Grid>

          <Grid item md={4}>

          <Paper elevation={4} sx={{ p: 2 }}>
            <Typography align="center" variant="h4" borderBottom={1} borderColor="divider"> Pending Reviews </Typography>

            <Stack direction="column">

            </Stack>
          </Paper>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
