'use client';


import * as React from 'react';

import { Box, Stack, Avatar, Typography, Button }
from '@mui/material';

import { toTitleCase, toPhoneNumber, toAppointmentTime } from '@/app/_lib/utils';


export default function EventItem({ appointment }: { appointment: Appointment}) {
  const [startDate, endDate] = [new Date(appointment.startDateTimeString), new Date(appointment.endDateTimeString)];
  const appointmentTime = toAppointmentTime(startDate, endDate);

  return (
    <Stack direction="column" spacing={2} pt={2}>
      <Stack direction="row" alignItems="end" borderBottom={1} borderColor="divider" spacing={4}>
        <Box flex={1} display="flex" justifyContent="start">
          <Typography variant="h4" fontWeight="bold"> Appointment </Typography>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <Typography variant="h5"> {appointmentTime} </Typography>
        </Box>
        <Box flex={1} display="flex" justifyContent="end">
          <Typography variant="h5"> {toTitleCase(appointment.locationName)} </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={4}>
        <Avatar src="" sx={{ width: 100, height: 100 }} />

        <Stack direction="column" justifyContent="center" width="80%">
          <Typography variant="h6"> {toTitleCase(`${appointment.tuteeFirstName} ${appointment.tuteeLastName}`)}  </Typography>
          <Typography variant="h6"> {appointment.tuteeEmail} </Typography>
          <Typography variant="h6"> {toPhoneNumber(appointment.tuteePhoneNumber.toString())} </Typography>
        </Stack>

        <Stack direction="column" justifyContent="center" width="20%" spacing={1}>
          <Button variant="contained" color="primary"> Request Change </Button>
          <Button variant="contained"> Test </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
