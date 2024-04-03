

import * as React from 'react';

import { Container, Stack, Box, Paper }
  from '@mui/material';

import theme from '@/app/(ui)/theme';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import type { EventClickArg } 
  from '@fullcalendar/core/index.js';

import { TableFetch }
  from '@/app/_lib/data';
import { toTime }
  from '@/app/_lib/utils';
import { move } from 'react-big-calendar';

  
const Day: { [key: string]: number } = { 
  "sunday": 0, 
  "monday": 1, 
  "tuesday": 2, 
  "wednesday": 3, 
  "thursday": 4, 
  "friday": 5, 
  "saturday": 6 
};


export default function TutorProfileSchedule({ selectedTutor } : { selectedTutor: Tutor | null }) {
  const calendar = React.createRef<FullCalendar>();
  const currentTime = new Date();

  const [selectedEvent, setSelectedEvent] = React.useState<Appointment>();

  const { data: TutorTimeData } = TableFetch<TutorTimePreference[]>("tutor_time_preference", [selectedTutor], `tutor_email_equals=${selectedTutor?.email}`);
  
  const getEvents = () => {
    return TutorTimeData?.map((timePreference: TutorTimePreference) => (
      { 
        groupId: "timePreference",

        startTime: timePreference.startTimeString,
        endTime: timePreference.endTimeString,
        daysOfWeek: [ Day[timePreference.weekdayName] ],

        display: 'background',
        //color: '#ccc'
      }
    ));
  };

  const handleEventClick = (event: EventClickArg) => {
    setSelectedEvent(event.event.extendedProps.data);
  };

  const handleEventReceive = (info: any) => {
    console.log(info.event);
  };

  React.useEffect(() => {
    var drag = document.getElementById('external-events');
    if (drag) {
      const draggable = new Draggable(drag, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText,
            
          };
        }
      });

      return () => draggable.destroy();
    }
  }, [])


  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={4}>
        <Stack direction="column" spacing={2} width="10%">
          <Paper elevation={4} sx={{ p: 2 }}>

            
          </Paper>
        </Stack>

        <Box width="90%">
          <FullCalendar 
            ref={calendar}
            plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
            initialView="timeGridWeek"

            height="80vh"
            /*selectAllow={(selectInfo) => {
              // Allow selection only on dates, not time slots
              return selectInfo.start.getTime() === selectInfo.end.getTime();
            }}*/
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
            allDaySlot={false}

            selectable selectMirror // selectConstraint="businessHours" //selectOverlap={(event) => event.display === 'background'}
            editable droppable eventOverlap={false}
            events={getEvents()} // eventColor={theme.palette.primary.main}
            eventClick={handleEventClick} eventReceive={handleEventReceive}
            nowIndicator scrollTime={currentTime.toLocaleTimeString('it-IT')} scrollTimeReset={false}
          />
        </Box>
      </Stack>
    </Container>
  );
}
