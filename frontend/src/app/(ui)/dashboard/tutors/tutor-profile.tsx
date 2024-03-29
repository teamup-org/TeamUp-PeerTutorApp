

import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Dialog, DialogTitle, DialogContent, Divider, Container, IconButton, Box, Slide, Typography, 
  LinearProgress, Stack, Rating, Select, FormControl, InputLabel, MenuItem, Grid }
  from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import TutorProfileReviews from './tutor-profile-reviews';
import { TutorCard } 
  from '@/app/(ui)/tutor-card';


const tutorSkeleton: Tutor = { activeStatusName: "active", averageRating: 0, bioText: "", coursePreferences: [], email: "", firstName: "", lastName: "", 
  listingTitle: "", locationPreferences: [], majorAbbreviation: "", numberOfRatings: 0, payRate: 0, phoneNumber: 0, pictureUrl: "", seniorityName: "Freshman" };

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


  return (
    <Dialog 
      open={selectedTutor ? true : false} onClose={() => setSelectedTutor(null)}
      TransitionComponent={Transition} keepMounted 
      aria-describedby="alert-tutor-profile"
      maxWidth="xl" fullWidth
    >
      <DialogTitle> <Typography variant="h2"> Tutor Title </Typography> </DialogTitle>
      <IconButton aria-label="close" onClick={() => setSelectedTutor(null)} 
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      > 
        <CloseIcon /> 
      </IconButton>
      
      <DialogContent dividers sx={{ p: 0, pb: 8 }}>
        <Container maxWidth="xl">
          <TutorCard elevation={0} tutor={selectedTutor ? selectedTutor : tutorSkeleton} />

          <Divider sx={{ my: 8 }} />

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
              
              nowIndicator //scrollTime={currentTime.toLocaleTimeString('it-IT')} scrollTimeReset={false}
              height="500px"
            />
          </Box>

          <Divider sx={{ my: 8 }} />
          
          <TutorProfileReviews tutor={selectedTutor ? selectedTutor : tutorSkeleton} />
        </Container>
      </DialogContent>

    </Dialog>
  );
}
