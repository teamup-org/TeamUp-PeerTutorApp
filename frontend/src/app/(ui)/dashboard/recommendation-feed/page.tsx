'use client';
import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { TableFetch } from '@/app/_lib/data';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export default function RecommendationPage() {
  const { user } = useUser();
  const { data: tuteeAppointments, error, refetch } = TableFetch("appointment", [user, "tutee"], `tutee_email_contains=${user?.email}`);

  if (error) return <div>Error loading appointments</div>;
  if (!tuteeAppointments) return <div>Loading...</div>;

  return (
    <Box position="static" p={4}>
      <Container maxWidth="lg" sx={{ minWidth: 750 }}>
        <Paper variant="outlined" sx={{ px: 4, pb: 4 }}>
          <Stack direction="column" spacing={4}>
            <Typography variant="h4">Appointments</Typography>
            <ul>
              {tuteeAppointments.data.map((appointment) => (
                <li key={appointment.id}>
                  <Typography variant="body1">Tutee: {appointment.tuteeEmail}</Typography>
                  <Typography variant="body1">Tutor: {appointment.tutorEmail}</Typography>
                  <Typography variant="body1">Time: {appointment.startDateTimeString}</Typography>
                  <Typography variant="body1">Subject: {appointment.tuteeRequestComment}</Typography>
                </li>
              ))}
            </ul>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
