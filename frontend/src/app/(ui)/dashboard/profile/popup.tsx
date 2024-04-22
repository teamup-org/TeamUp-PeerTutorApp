import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Dialog, DialogTitle, DialogContent, Divider, Container, IconButton, Stack, Slide, SlideProps, Typography, Button, Snackbar, Alert }
  from '@mui/material';

import { TutorInfoChecking, TuteeInfoChecking }
  from '@/app/_lib/utils'

import  { EditTutorInfo } 
  from './editTutorInfo';

import { EditTuteeInfo } 
  from './editTuteeInfo';

/**
 * Transition animation for popup
 */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
  ) {
  return <Slide direction="up" ref={ref} {...props} />;
  });

/**
 * Component for displaying popup after 'edit' button is pressed on Profile Page
 * @param props 
 * @returns 
 */  
export function GeneralInfoPopup(
  {open, setOpen, data, setData, setSave, tutor}
  :
  {open: boolean, setOpen: Function, data: Tutor | Tutee, setData: Function, setSave: Function, tutor: boolean}
) {

  // State Variables for error checking
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const title = `${data.firstName} ${data.lastName}'s General Information`

  const handleDialogClose = () => {
    setOpen(false);
    };

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
  
    setAlertOpen(false);
  };

  /**
   * Error checks the input and saves new data to Tutor/Tutee variable
   */
  const handleSave = () => {

    let error = '';

    if (tutor) {
      error = TutorInfoChecking(data);
    }
    else {
      error = TuteeInfoChecking(data);
    }

    if (error) {
      setAlertMessage(error);
      setAlertOpen(true);
    }
    else {
      setSave(true);
      setOpen(false);
    }
  };


  return (
    <>
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

        <Typography variant="h4" fontWeight="bold"> {title} </Typography>
      </Stack>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 4, pb: 8 }}>
      <Container maxWidth="xl" sx={{ minWidth: 800 }}>
        <Stack direction="column" spacing={4} alignItems="center" divider={ <Divider orientation="horizontal" flexItem /> }>
          {('listingTitle' in data) ? <EditTutorInfo data={data} setData={setData} /> : 
               <EditTuteeInfo data={data} setData={setData} />}
          <Button onClick={handleSave}>
            <Typography color='secondary'> Save </Typography>
          </Button>
        </Stack>
      </Container>
      </DialogContent>

    </Dialog>

    <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={alertOpen} autoHideDuration={5000} onClose={handleAlertClose}>
    <Alert
    onClose={handleAlertClose}
    severity="error"
    sx={{ width: '100%' }}
    >
    {alertMessage}
    </Alert>
    </Snackbar>
    </>
  );
}