

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


// Transition component for Dialogue popup
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Component for displaying a tutor's profile popup containing separate schedule and review components
 * @param tutor - A 'Tutor' value to pull rating information from and also use to query for appointments and reviews. Can be 'null' value as well when values are not initially populated
 * @param open - State variable and setter function to control when profile is opened or closed
 * @returns 
 */  
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
