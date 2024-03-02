import { Box, Container, Paper, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box position="static" mt="70px" mb="40px">
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{mt:5}}>
          <Typography variant="h2" align="center">
            Schedule
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}