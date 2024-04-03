

import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Dialog, DialogTitle, DialogContent, Divider, Container, IconButton, Stack, Slide }
  from '@mui/material';

import TutorProfileReviews from './tutor-profile-reviews';
import TutorProfileSchedule from './tutor-profile-schedule';
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
        <Container maxWidth="xl" sx={{ minWidth: 800 }}>
          <Stack direction="column" spacing={4} alignItems="center" divider={ <Divider orientation="horizontal" flexItem /> }>
            { selectedTutor &&
            <TutorCard elevation={0} tutor={selectedTutor} /> 
            }

            <TutorProfileSchedule selectedTutor={selectedTutor} />
            
            { selectedTutor &&
              <TutorProfileReviews tutor={selectedTutor} />
            }
          </Stack>
        </Container>
      </DialogContent>

    </Dialog>
  );
}
