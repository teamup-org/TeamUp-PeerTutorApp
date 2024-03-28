

import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Dialog, DialogTitle, DialogContent, Divider, Container, IconButton, Box, Slide, Typography, 
  LinearProgress, Stack, Rating, Select }
  from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Review from '@/app/(ui)/review';
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
        <Container maxWidth="lg">
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

          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={4} justifyItems="center" borderBottom={1} pb={2} borderColor="divider">
              <Stack direction="column" alignItems="center" justifyItems="center">
                <Typography variant="h2"> 4.7 </Typography>

                <Rating value={4.7} precision={0.5} />

                <Typography variant="body1"> (30k) </Typography>
              </Stack>

              <Stack direction="column" width={500}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" width={50}> 5 star </Typography>

                  <LinearProgress variant="determinate" value={85} sx={{ width: '90%', height: 8, borderRadius: 8 }} />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" width={50}> 4 star </Typography>

                  <LinearProgress variant="determinate" value={10} sx={{ width: '90%', height: 8, borderRadius: 8 }} />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" width={50}> 3 star </Typography>

                  <LinearProgress variant="determinate" value={2} sx={{ width: '90%', height: 8, borderRadius: 8 }} />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" width={50}> 2 star </Typography>

                  <LinearProgress variant="determinate" value={2} sx={{ width: '90%', height: 8, borderRadius: 8 }} />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" width={50}> 1 star </Typography>

                  <LinearProgress variant="determinate" value={1} sx={{ width: '90%', height: 8, borderRadius: 8 }} />
                </Stack>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={4}>
              <Select size="small">

              </Select>
              
              <Review />
            </Stack>
          </Stack>
        </Container>
      </DialogContent>

    </Dialog>
  );
}
