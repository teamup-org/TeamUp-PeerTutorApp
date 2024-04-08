

import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Dialog, DialogTitle, DialogContent, Divider, Container, IconButton, Stack, Slide, SlideProps, Typography }
  from '@mui/material';

import TutorProfileReviews from './tutor-profile-reviews';
import TutorProfileSchedule from './tutor-profile-schedule';
import { TutorCard } 
  from '@/app/(ui)/tutor-card';
import { toTitleCase }
  from '@/app/_lib/utils';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function TutorProfile(
  { tutor: tutor, open: [open, setOpen] } : { tutor: Tutor | null, open: [boolean, Function] }
){
  const name = toTitleCase(`${tutor?.firstName}`);

  const handleDialogClose = () => {
    setOpen(false);
  };


  return (
    <Dialog 
      open={open} onClose={handleDialogClose}
      TransitionComponent={Transition} transitionDuration={250}  
      aria-describedby="alert-tutor-profile"
      maxWidth="xl" fullWidth
    >
      <DialogTitle sx={{ p: 1 }}> 
        <Stack direction="row" spacing={2}>
          <IconButton aria-label="close" onClick={handleDialogClose}> 
            <CloseIcon />
          </IconButton>

          <Typography variant="h4" fontWeight="bold"> {`${name}'s Tutor Profile`} </Typography>
        </Stack>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 4, pb: 8 }}>
        <Container maxWidth="xl" sx={{ minWidth: 800 }}>
          <Stack direction="column" spacing={4} alignItems="center" divider={ <Divider orientation="horizontal" flexItem /> }>
            <TutorCard tutor={tutor} /> 
            
            <TutorProfileSchedule tutor={tutor} />

            <TutorProfileReviews tutor={tutor} />
          </Stack>
        </Container>
      </DialogContent>

    </Dialog>
  );
}
