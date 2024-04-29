

import * as React from 'react';

import { Stack }
  from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

import interactionPlugin from '@fullcalendar/interaction';
import type { EventClickArg, EventInput } 
  from '@fullcalendar/core/index.js';

import { toTitleCase }
  from '@/app/_lib/utils';
import EventItem from './event-item';


// 
function mapEventColor(isConfirmed: boolean, isCancelled: boolean) {
  if (!isConfirmed && !isCancelled) {
    return "#b4b4b8";
  } else if (isConfirmed && !isCancelled) {
    return "#baffc9";
  } else if (isConfirmed && isCancelled) {
    return "#ffb3ba";
  }
  
  return "black";
}


/**
 * Component for displaying the FullCalendar Schedule containing tutor and tutee appointments and requests.
 * @param tutorEventData - Appointment list containing the signed-in user's queried tutor appointments
 * @param tuteeEventData - Appointment list containing the signed-in users's queried tutee appointments
 * @param refetch - Refetch functions for refreshing the tutor and tutee queries in the schedule page
 * @returns 
 */  
export default function Schedule(
  { tutorEventData, tuteeEventData, refetch: [tutorRefetch, tuteeRefetch] } : 
  { tutorEventData: Appointment[], tuteeEventData: Appointment[], refetch: [Function, Function] }
){
  const currentTime = new Date();
  
  // State variables controlling the selected event and boolean status of the EventItem popup
  const [event, setEvent] = React.useState<Appointment>();
  const [eventOpen, setEventOpen] = React.useState(false);

  // Handler function for opening the custom EventItem component popup
  const handleEventClick = (currentEvent: EventClickArg) => {
    currentEvent.jsEvent.preventDefault();
    setEventOpen(true);
    setEvent(currentEvent.event.extendedProps.data as Appointment);
  };

  // Helper function for formatting events into schedule as FullCalendar Events
  const formatEvents = () => {
    return tutorEventData?.map<EventInput>((appointment: Appointment) => (
      { 
        title: toTitleCase(`Tutee: ${appointment.tuteeFirstName} ${appointment.tuteeLastName}`),
        start: appointment.startDateTimeString,
        end: appointment.endDateTimeString,

        data: appointment,
        textColor: 'black',
        color: mapEventColor(appointment.isConfirmed, appointment.isCancelled),
        url: "click",
        // backgroundColor: mapEventColor(appointment.isConfirmed, appointment.isCancelled),
        // borderColor: 'black'
      }
    )).concat( tuteeEventData?.map<EventInput>((appointment: Appointment) => (
      {
        title: toTitleCase(`Tutor: ${appointment.tutorFirstName} ${appointment.tutorLastName}`),
        start: appointment.startDateTimeString,
        end: appointment.endDateTimeString,

        data: appointment,
        color: mapEventColor(appointment.isConfirmed, appointment.isCancelled),
        textColor: 'black',
        url: "click",
        isConfirmed: appointment.isConfirmed,
        isCancelle: appointment.isCancelled
      }
      )) as ConcatArray<EventInput>
    );
  };


  return (
    <Stack direction="column" spacing={2} width="100%">
      <FullCalendar 
        plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
        
        initialView="timeGridWeek"

        height="70vh"
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

        allDaySlot={false} slotDuration="00:15:00" slotLabelInterval="01:00"
        events={formatEvents()} 
        eventClick={handleEventClick} 
        eventOverlap={false}

        nowIndicator scrollTime={currentTime.toLocaleTimeString('it-IT')} scrollTimeReset={false}
      />

      <EventItem appointment={event} event={[eventOpen, setEventOpen]} refetch={[tutorRefetch, tuteeRefetch]} />
    </Stack>
  );
}
