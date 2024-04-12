import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Dialog, DialogTitle, DialogContent, Divider, Container, IconButton, Stack, Slide, SlideProps, Typography, Button }
  from '@mui/material';

import EditTutorInfo 
  from './editTutorInfo';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

export default function TutorGeneralInfoPopup(props: any) {

    const { open, setOpen, data, setData, setSave } = props;

    const title = `${data.firstName} ${data.lastName}'s General Information`

    const handleDialogClose = () => {
        setOpen(false);
      };

    const handleSave = () => {
        setSave(true);
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

                <Typography variant="h4" fontWeight="bold"> {title} </Typography>
            </Stack>
            </DialogTitle>
            
            <DialogContent dividers sx={{ pt: 4, pb: 8 }}>
            <Container maxWidth="xl" sx={{ minWidth: 800 }}>
                <Stack direction="column" spacing={4} alignItems="center" divider={ <Divider orientation="horizontal" flexItem /> }>
                    <EditTutorInfo data={data} setData={setData} />
                    <Button onClick={handleSave}>
                        <Typography color='secondary'> Save </Typography>
                    </Button>
                </Stack>
            </Container>
            </DialogContent>

        </Dialog>
    );
}