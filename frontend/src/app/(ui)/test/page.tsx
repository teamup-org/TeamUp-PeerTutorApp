'use client';


import * as React from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import type { DateSelectArg, EventClickArg, EventDropArg } 
  from '@fullcalendar/core/index.js';


export default function Page() {
  const scheduleRef = React.useRef<FullCalendar>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<EventClickArg>();

  const handleCustomButton = () => {
    selectedEvent?.event.remove();
  };

  // Callback function after releasing click on date selection
  const handleDateSelect = (event: DateSelectArg) => {
    event.view.calendar.unselect();
    event.view.calendar.addEvent(event);
  };

  const handleEventDrop = (event: EventDropArg) => {
    if (selectedEvent) selectedEvent.el.style.outline = "";
    event.el.style.outline = "2px solid black";
    setSelectedEvent(event);
  };

  // Callback function after clicking event
  const handleEventClick = (info: EventClickArg) => {
    if (selectedEvent) selectedEvent.el.style.outline = "";
    info.el.style.outline = "2px solid black";
    setSelectedEvent(info);
  };

  return (
    <FullCalendar
      ref={scheduleRef}
      plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
      
      initialView="timeGridWeek"
      height="70vh"
      headerToolbar={{
        left: 'deleteTime',
        right: 'submitTimes',
      }}
      dayHeaderFormat={{ weekday: 'long' }}
      customButtons={{
        deleteTime: {
          text: 'Remove Selected Time',
          click: handleCustomButton,
        },
        submitTimes: {
          text: 'Submit Time Preference',
          click: () => {console.log(scheduleRef.current?.getApi().getEvents())}
        }
      }}
      allDaySlot={false} slotDuration="00:15:00" slotLabelInterval="01:00"
      unselectAuto={false} editable selectable selectMirror selectOverlap={false} eventOverlap={false}
      eventClick={handleEventClick} eventDrop={handleEventDrop}
      select={handleDateSelect}
    />
  );
}
