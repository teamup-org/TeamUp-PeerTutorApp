import * as React from 'react';

import EditIcon 
  from '@mui/icons-material/Edit';

import { Stack, Paper, Typography, Divider, IconButton}
    from '@mui/material'

import GeneralInfoPopup
    from './popup';
  
import TuteeInformation
    from './tuteeInfo';

export default function TuteeUpdatePage(props: any) {
    const { popupOpen, setPopupOpen, data, setData, setTuteeUpdate} = props;
  
    // Boolean for whether save button in popup window is pressed
    const [save, setSave] = React.useState(false);
  
    // If save is pressed in popup, pass to parent component for database modification
    React.useEffect(() => {
      if (save) {
        setTuteeUpdate(true);
        setPopupOpen(false);
      }
    },[save]);

    const handlePopUp = () => {
      setPopupOpen(true);
    };
  
    return (
        <Paper variant="outlined" style={{ width: '80%', margin: 'auto' }}>

        <GeneralInfoPopup setSave={setTuteeUpdate} data={data} setData={setData} open={popupOpen} setOpen={setPopupOpen} tutor={false} />

        <Stack direction="column" p={2} style={{ flexGrow: 1 }}>

            <Stack direction="row" spacing={2}>
            <Typography variant="h6" gutterBottom>
                General Info
            </Typography>

            <IconButton onClick={handlePopUp}>
                <EditIcon />
            </IconButton>
            </Stack>

            <Divider style={{ marginBottom: '20px' }} />
            <TuteeInformation data={data} />

        </Stack>
        </Paper>
    );
  }