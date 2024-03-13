'use client';

import * as React from 'react';

import { Box, Container, Paper, Stack, Typography, Button } 
from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { EventClickArg } 
from '@fullcalendar/core/index.js';
import type { EventImpl } 
from '@fullcalendar/core/internal';

import { toTitleCase } 
from '@/app/_lib/utils';
import { TableFetch, TableUpdate } 
from '@/app/_lib/data';

export default function DashboardPage() {
  const {data, isLoading, isError} = TableFetch("appointment_listing");
  const [selectedEvent, setSelectedEvent] = React.useState<EventImpl>();

  const getEvents = () => {
    return data?.map((appointment: any) => (
      { 
        title: toTitleCase(appointment.tutorFirstName + " " + appointment.tutorLastName),
        start: appointment.startDateTimeString,
        end: appointment.endDateTimeString,
      }
    ));
  };
  
  const handleEventClick = (event: EventClickArg) => {
    setSelectedEvent(event.event);
  };
  /*
  const handleClickOutside(event) {
    setSelectedEvent(null);
  }

  document.addEventListener("mousedown", handleClickOutside);
  */
  const handleCancel = () => {
    const {data, isError} = TableUpdate("appointment_listing", "appointmentStatusName", "cancelled");
  };

  return (
    <Box position="static" mt="50px" mb="40px">
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ mt:5, p:2 }}>
          <Stack direction="column" spacing={2}>
            <FullCalendar 
              plugins={[ timeGridPlugin ]}
              initialView="timeGridWeek"
              allDaySlot={false}
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              events={getEvents()}
              eventClick={handleEventClick}
              nowIndicator
              height="500px"
            />
            { selectedEvent && (
              <Stack direction="column">
                <Typography>
                  Tutor: {selectedEvent.title}
                </Typography>
                <Typography>
                  Start: {selectedEvent.start?.toString()}
                </Typography>
                <Typography>
                  End: {selectedEvent.end?.toString()}
                </Typography>
                <Button onClick={handleCancel} variant="contained" >Cancel</Button>
              </Stack>
              )
            }
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}