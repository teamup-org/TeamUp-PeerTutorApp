

import * as React from 'react';

import { Stack, Dialog, DialogTitle, DialogContent }
  from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventImpl } 
  from '@fullcalendar/core/internal';
import interactionPlugin, { Draggable, DateClickArg } from '@fullcalendar/interaction';
import type { DateSelectArg, EventClickArg, EventInput } 
  from '@fullcalendar/core/index.js';

import { toTitleCase, toTime }
  from '@/app/_lib/utils';
import EventItem from './event-item';
// (isTutee, isConfirmed, isCancelled)
// 000 tutor, not confirmed, not cancelled --> fresh appointment created by tutee (pending appointment)
// 010 tutor, confirmed, not cancelled --> You confirmed appointment (good to go)
// 011 tutor, confirmed, cancelled --> You confirmed appointment, but then you or tutee went back to cancel (cancelled)

// 100 tutee, not confirmed, not cancelled --> fresh appointment created by you (pending appointment)
// 110 tutee, confirmed, not cancelled --> tutor confirmed appointment (good to go)
// 111 tutee, confirmed, cancelled --> tutor confirmed appointment, but then tutor or you went back to cancel (cancelled)

// colors
// pending -> yellow
// confirmed -> green
// cancelled -> grey

// add tutor or tutee to calendar items

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


export default function Schedule(
  { tutorEventData, tuteeEventData, refetch: [tutorRefetch, tuteeRefetch] } : 
  { tutorEventData: Appointment[], tuteeEventData: Appointment[], refetch: [Function, Function] }
){
  const currentTime = new Date();
  const [event, setEvent] = React.useState<Appointment>();
  const [eventOpen, setEventOpen] = React.useState(false);

  const handleEventClick = (currentEvent: EventClickArg) => {
    currentEvent.jsEvent.preventDefault();
    setEventOpen(true);
    setEvent(currentEvent.event.extendedProps.data as Appointment);
  };

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
