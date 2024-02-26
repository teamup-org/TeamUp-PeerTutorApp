import { Box, Container, Paper, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box position="relative" sx={{top: 50}}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{mt:5}}>
          <Typography variant="h2" align="center">
            Profile
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
