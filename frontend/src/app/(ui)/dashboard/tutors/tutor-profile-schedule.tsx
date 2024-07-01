

import * as React from 'react';

import { useUser } from "@auth0/nextjs-auth0/client";

import { TransitionProps }
  from '@mui/material/transitions';
import { Stack, Snackbar, Alert, Slide }
  from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateSelectArg, EventInput } 
  from '@fullcalendar/core/index.js';

import { TableFetch, TablePush }
  from '@/app/_lib/data';
import { toTitleCase } 
  from '@/app/_lib/utils';


// Mapping of week days to its corresponding numerical value
const Day: { [key: string]: number } = { 
  "sunday": 0, 
  "monday": 1, 
  "tuesday": 2, 
  "wednesday": 3, 
  "thursday": 4, 
  "friday": 5, 
  "saturday": 6 
};

// Transition element for popup components
const AlertTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});


/**
 * Component for displaying a tutor's FullCalendar schedule on their profile
 * @param tutor - A 'Tutor' value to query for appointments. Can be 'null' value as well when values are not initially populated
 * @returns 
 */  
export default function TutorProfileSchedule({ tutor } : { tutor: Tutor | null }) {
  const calendar = React.createRef<FullCalendar>();
  const currentTime = new Date();
  const tutorName = toTitleCase(`${tutor?.firstName} ${tutor?.lastName}`);

  const { user } = useUser();
  const tuteeEmail = user?.email;

  // State variables for selecting a time range on the FullCalendar schedule component and controlling alert popups
  const [selectedTime, setSelectedTime] = React.useState<String[]>();
  const [alertOpen, setAlertOpen] = React.useState(false);


  // Appointment Queries for selected tutor and user's tutee profile
  const { data: tutorEvents } = TableFetch<AppointmentQuery>("appointment", [tutor, "tutor"], 
    `tutor_email_contains=${tutor?.email}`, 
    `is_cancelled_equals=${false}`,
    `is_confirmed_equals=${true}`
    // `start_date_time_greater_than_or_equals=${new Date()}`
  );
  const { data: tuteeEvents } = TableFetch<AppointmentQuery>("appointment", [tutor, "tutee"], 
    `tutee_email_contains=${tutor?.email}`, 
    `is_cancelled_equals=${false}`,
    `is_confirmed_equals=${true}`
    // `start_date_time_greater_than_or_equals=${new Date()}`
  );

  const { data: userTutorEvents } = TableFetch<AppointmentQuery>("appointment", [tuteeEmail, "tutor"], 
    `tutor_email_contains=${tuteeEmail}`, 
    `is_cancelled_equals=${false}`,
    `is_confirmed_equals=${true}`
    // `start_date_time_greater_than_or_equals=${new Date()}`
  );

  const { data: userTuteeEvents } = TableFetch<AppointmentQuery>("appointment", [tuteeEmail, "tutee"], 
    `tutee_email_contains=${tuteeEmail}`, 
    `is_cancelled_equals=${false}`,
    `is_confirmed_equals=${true}`
    // `start_date_time_greater_than_or_equals=${new Date()}`
  );

  // Mutation handler for creating appointment requests
  const tutorTimeRequest = TablePush("appointment");

  // Getter function for mapping tutor and tutee's appointment information to FullCalendar Event format as one large array
  const getEvents = () => {
    if (tutor && tutorEvents && tuteeEvents && userTutorEvents && userTuteeEvents)
    return tutor.timePreferences.map<EventInput>((timePreference: TutorTimePreference) => (
      { 
        groupId: "timePreference",

        startTime: timePreference.startTimeString,
        endTime: timePreference.endTimeString,
        daysOfWeek: [ Day[timePreference.weekdayName] ],

        display: 'background',
        //color: '#ccc'
      }
    )).concat( tutorEvents.data.map<EventInput>((event: Appointment) => (
      {
        title: "Unavailable",
        start: event.startDateTimeString,
        end: event.endDateTimeString,
        textColor: "black",
        color: "lightgrey"
      }
    )) as ConcatArray<EventInput>
    ).concat( tuteeEvents.data.map<EventInput>((event: Appointment) => (
      {
        title: "Unavailable",
        start: event.startDateTimeString,
        end: event.endDateTimeString,
        textColor: "black",
        color: "lightgrey"
      }
    )) as ConcatArray<EventInput>
    ).concat( userTutorEvents.data.map<EventInput>((event: Appointment) => (
      {
        title: `Tutor: ${event.tuteeEmail}`,
        start: event.startDateTimeString,
        end: event.endDateTimeString,
        textColor: 'black',
        color: "#ffb3ba"
      }
    )) as ConcatArray<EventInput>
    ).concat( userTuteeEvents.data.map<EventInput>((event: Appointment) => (
      {
        title: `Tutee: ${event.tutorEmail}`,
        start: event.startDateTimeString,
        end: event.endDateTimeString,
        textColor: 'black',
        color: "#ffb3ba"
      }
    )) as ConcatArray<EventInput>
    );
  };

  // Handler functions
  const handleDateSelect = (arg: DateSelectArg) => {
    setSelectedTime([arg.startStr, arg.endStr]);
  };

  const handleTutorTimeRequestQuery = () => {
    if (selectedTime) {
      tutorTimeRequest.mutate(
        {
          tutor_email: tutor?.email,
          tutee_email: tuteeEmail,
          
          appointment_size_name: "single",
          location_name: 'online',

          start_date_time: selectedTime[0].slice(0, selectedTime[0].lastIndexOf('-')),
          end_date_time: selectedTime[1].slice(0, selectedTime[1].lastIndexOf('-')),

          tutee_request_comment: "",
        }, 
        { 
          onSettled: (data, error, variables, context) => {
            setAlertOpen(true);
          }, 
        }
      );
    }
  };

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setAlertOpen(false);
  };


  return (
    <Stack direction="row" width="100%" spacing={4} justifyContent="center">
      
      <Stack direction="column" spacing={2} width="100%">
        <FullCalendar 
          ref={calendar}
          plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
          
          initialView="timeGridWeek"
          validRange={ function(currentDate){
            return {
              start: currentDate,
              end: new Date(currentDate).setMonth(currentDate.getMonth() + 1),
            };
          }}

          height="80vh"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'tutorRequest timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: 'Today',
            week: 'Week',
            day: 'Day',
          }}
          customButtons={{
            tutorRequest: {
              text: 'Request Selected Time',
              click: handleTutorTimeRequestQuery,
            }
          }}
          allDaySlot={false} slotDuration="00:15:00" slotLabelInterval="01:00"
          unselectAuto={false}
          selectable selectMirror selectOverlap={(event) => (event.display === 'background')}
          eventOverlap={false}
          events={getEvents()} // eventColor={theme.palette.primary.main}

          select={handleDateSelect}
        
          nowIndicator scrollTime={currentTime.toLocaleTimeString('it-IT')} scrollTimeReset={false}
        />
      </Stack>

      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={alertOpen} TransitionComponent={AlertTransition} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity={tutorTimeRequest.isSuccess ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          { tutorTimeRequest.isSuccess ?
          "Request Successfully Sent!"
          :
          "Request Failed"
          }
        </Alert>
      </Snackbar>
    </Stack>
  );
}
