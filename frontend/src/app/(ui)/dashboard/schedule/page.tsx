'use client';

import * as React from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Container, Paper, Stack, Typography, Button, Tabs, Tab, Divider } 
from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import ListIcon from '@mui/icons-material/List';

import { DataGrid, GridColDef } 
from '@mui/x-data-grid';


import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateClickArg } from '@fullcalendar/interaction'
import type { EventClickArg, DateSelectArg } 
from '@fullcalendar/core/index.js';
import type { EventImpl } 
from '@fullcalendar/core/internal';

import { toTitleCase, toPhoneNumber, toAppointmentTime } 
from '@/app/_lib/utils';
import { TableFetch, TableUpdate } 
from '@/app/_lib/data';
import EventItem from './event-item';
import theme from '@/app/(ui)/theme';


const columns: GridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 100,
    // editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 100,
    // editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 250,
  },
  
  {
    field: 'location',
    headerName: 'Location',
    width: 200,
  },
];


export default function SchedulePage() {
  const calendar = React.createRef<FullCalendar>();
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() - 1);

  const {data, isLoading, isError} = TableFetch<AppointmentQuery>("appointment", []);
  const [event, setEvent] = React.useState<Appointment>();

  const [tab, setTab] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, value: any) => {
    setTab(value);
  };

  const getEvents = () => {
    return data?.data?.map((appointment: Appointment) => (
      { 
        title: toTitleCase(`${appointment.tuteeFirstName} ${appointment.tuteeLastName}`),
        start: appointment.startDateTimeString,
        end: appointment.endDateTimeString,
        data: appointment,
      }
    ));
  };

  const rows = data?.data?.map((appointment: Appointment, index) => (
    {
      id: index,
      firstName: appointment.tuteeFirstName,
      lastName: appointment.tuteeLastName,
      email: appointment.tuteeEmail,
      phone: toPhoneNumber(appointment.tuteePhoneNumber.toString()),
      time: toAppointmentTime(new Date(appointment.startDateTimeString), new Date(appointment.endDateTimeString)),
      date: '',
      location: appointment.locationName,
    }
  ));
  
  const handleEventClick = (selectedEvent: EventClickArg) => {
    setEvent(selectedEvent.event.extendedProps.data);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    //if (event.target)
    //setEvent();
  }
  document.addEventListener("mousedown", handleClickOutside);
  
  const handleCancel = () => {
    // const {data, isError} = TableUpdate("appointment_listing", "appointmentStatusName", "cancelled");
  };

  const handleDateSelect = (arg: DateClickArg) => {
    const calendarApi = calendar.current?.getApi();
    if (calendarApi) {
      const selectedDate = arg.date;
      const startDate = new Date(calendarApi.view.activeStart); // Start of current view
      const columnIndex = selectedDate.getDay(); // Index of the day (0: Sunday, 1: Monday, ...)
      const columnStartDate = new Date(startDate);
      columnStartDate.setDate(columnStartDate.getDate() + columnIndex);
      const columnEndDate = new Date(columnStartDate);
      columnEndDate.setDate(columnEndDate.getDate() + 1);


      // Unselect any existing selection
      calendarApi.unselect();
      // Select the clicked time slot
      calendarApi.select(columnStartDate, columnEndDate);
    }
  };


  return (
    <Box position="static" p={4}>
      <Container maxWidth="lg" sx={{ minWidth: 750 }}>
        <Paper elevation={4} sx={{ px: 4, pb: 4 }}>
          <Stack direction="column" spacing={4}>
            <Tabs value={tab} onChange={handleTabChange} aria-label="tabs-my_schedule_view" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tab icon={<CalendarMonthIcon fontSize="medium" />} iconPosition="top" label="Calendar" sx={{ p: 0 }} />
              <Tab icon={<ListIcon />} iconPosition="top" label="List" sx={{ p: 0 }} />
            </Tabs>

            { (tab === 0) ?
              ( <Box>
                  <FullCalendar 
                    ref={calendar}
                    plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
                    initialView="timeGridWeek"
                    allDaySlot={false}
                    selectable={true}
                    selectAllow={(selectInfo) => {
                      // Allow selection only on dates, not time slots
                      return selectInfo.start.getTime() === selectInfo.end.getTime();
                    }}
                    // dateClick={handleDateSelect}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    buttonText={{
                      today: 'Today',
                      month: 'Month',
                      week: 'Week',
                      day: 'Day',
                    }}
                    events={getEvents()} eventClick={handleEventClick} eventColor={theme.palette.primary.main} eventTextColor={theme.palette.secondary.main}
                    nowIndicator scrollTime={currentTime.toLocaleTimeString('it-IT')} scrollTimeReset={false}
                    height="500px"
                  />

                  { event && <EventItem appointment={event} /> }
                </Box> )
              :
              ( <>
                <DataGrid 
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection disableRowSelectionOnClick
                />
              </> )
            }
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}