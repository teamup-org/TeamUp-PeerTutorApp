

import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Dialog, DialogTitle, DialogContent, Divider, Container, IconButton, Box, Slide }
  from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import TutorProfileReviews from './tutor-profile-reviews';
import { TableFetch }
  from '@/app/_lib/data';
import { toTitleCase }
  from '@/app/_lib/utils';
import { TutorCard } 
  from '@/app/(ui)/tutor-card';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function TutorProfile(
  { tutorState: [selectedTutor, setSelectedTutor] } : { tutorState: [Tutor | null, Function] }
){
  const calendar = React.createRef<FullCalendar>();

  const { data: appointmentData } = TableFetch<AppointmentQuery>("appointment", [selectedTutor], `tutor_email_contains=${selectedTutor?.email}`);

  const getEvents = () => {
    return appointmentData?.data?.map((appointment: Appointment) => (
      { 
        title: toTitleCase(`${appointment.tuteeFirstName} ${appointment.tuteeLastName}`),
        start: appointment.startDateTimeString,
        end: appointment.endDateTimeString,
        data: appointment,
      }
    ));
  };


  return (
    <Dialog 
      open={selectedTutor ? true : false} onClose={() => setSelectedTutor(null)}
      TransitionComponent={Transition} keepMounted 
      aria-describedby="alert-tutor-profile"
      maxWidth="xl" fullWidth
    >
      <DialogTitle> 
        <IconButton aria-label="close" onClick={() => setSelectedTutor(null)} > 
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0, pb: 8 }}>
        <Container maxWidth="xl">
          { selectedTutor &&
          <TutorCard elevation={0} tutor={selectedTutor} /> 
          }

          <Box>
            <FullCalendar 
              ref={calendar}
              plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
              initialView="timeGridWeek"
              allDaySlot={false}
              selectable={true}
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
              events={getEvents()}
              nowIndicator //scrollTime={currentTime.toLocaleTimeString('it-IT')} scrollTimeReset={false}
              height="700px"
            />
          </Box>

          <Divider sx={{ my: 8 }} />
          
          { selectedTutor &&
            <TutorProfileReviews tutor={selectedTutor} />
          }
        </Container>
      </DialogContent>

    </Dialog>
  );
}
