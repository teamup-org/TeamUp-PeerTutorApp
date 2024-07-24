'use client';
import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { TableFetch } from '@/app/_lib/data';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export default function RecommendationPage() {
  const { user } = useUser();
  const { data: tuteeAppointments, error } = TableFetch("appointment", [user, "tutee"], `tutee_email_contains=${user?.email}`);

  if (error) return <div>Error loading appointments</div>;
  if (!tuteeAppointments) return <div>Loading...</div>;

  // Extract subjects from appointments
  const subjects = tuteeAppointments.data.map(appointment => appointment.tuteeRequestComment).filter(subject => subject && subject.trim() !== '');

  return (
    <Box position="static" p={4}>
      <Container maxWidth="lg" sx={{ minWidth: 750 }}>
        <Paper variant="outlined" sx={{ px: 4, pb: 4 }}>
          <Stack direction="column" spacing={4}>
            <Typography variant="h4">Appointment Subjects</Typography>
            <ul>
              {subjects.map((subject: string, index: number) => (
                <li key={index}>
                  <Typography variant='body1'>{subject}</Typography>
                </li>
              ))}
            </ul>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
