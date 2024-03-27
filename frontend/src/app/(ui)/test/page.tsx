'use client';


import * as React from 'react';

import { Container, Paper } from '@mui/material';

import { ViewState, EditingState, ChangeSet } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  TodayButton,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,

  CurrentTimeIndicator,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';


const eventData = [
  { startDate: '2024-03-27T09:45', endDate: '2024-03-27T10:45', title: 'Test', test: 'test' },
  { startDate: '2024-03-27T12:00', endDate: '2024-03-27T13:00', title: 'Test 2' }
];


export default function Test() {
  const [view, setView] = React.useState("week");
  const currentViewNameChange = (currentViewName: string) => {
      setView(currentViewName);
  };

  const [date, setDate] = React.useState<Date>(new Date());
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const [addAppointment, setAddAppointment] = React.useState({});
  const handleAddAppointmentChange = (newAppointment: object) => {
    setAddAppointment({ newAppointment });
  };

  const [appointmentChanges, setAppointmentChanges] = React.useState({});
  const handleAppointmentChangesChange = (newChanges: object) => {
    setAppointmentChanges({ newChanges });
  };

  const [editingAppointment, setEditingAppointment] = React.useState({});
  const handleEditingAppointmentChange = (newEdits: object) => {
    setEditingAppointment({ newEdits });
  };

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    

    if (added) {

    }

    if (changed) {

    }

    if (deleted !== undefined) {

    }

    // return { data };
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={4} sx={{ mt: 4, p: 4 }}>
        <Scheduler data={eventData} height={660}>
          <ViewState
            currentViewName={view} onCurrentViewNameChange={currentViewNameChange}
            currentDate={date} onCurrentDateChange={handleDateChange}
          />
          <EditingState
            onCommitChanges={commitChanges}
            addedAppointment={addAppointment} onAddedAppointmentChange={handleAddAppointmentChange}
            appointmentChanges={appointmentChanges} onAppointmentChangesChange={setAppointmentChanges}
            editingAppointment={editingAppointment} onEditingAppointmentChange={setEditingAppointment}
          />

          <DayView />
          <WeekView
            name="week" displayName='Week'
            startDayHour={6}
            endDayHour={23}
          />
          <MonthView />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />

          <CurrentTimeIndicator
            shadePreviousCells
            shadePreviousAppointments
            updateInterval={60000}
          />
        </Scheduler>
      </Paper>
    </Container>
  );
}
