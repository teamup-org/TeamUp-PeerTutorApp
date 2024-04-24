import * as React from 'react';

import EditIcon 
  from '@mui/icons-material/Edit';

import { Stack, Paper, Typography, Divider, IconButton}
  from '@mui/material'

import { GeneralInfoPopup }
  from './popup';
  
import { TuteeInformation }
  from './tuteeInfo';

/**
 * Component for displaying Tutee Tab on Profile Page
 * @param popupOpen - State variable for state of edit popup
 * @param data - Tutee Data
 * @param tuteeUpdate - State variable for sending trigger for tutee updates 
 * @returns 
 */
export function TuteeUpdatePage(
  {popupOpen   : [popupOpen, setPopupOpen],
   data        : [data, setData],
   tuteeUpdate : [tuteeUpdate, setTuteeUpdate]
  }
  :
  {popupOpen   : [boolean, Function],
   data        : [Tutee, Function],
   tuteeUpdate : [boolean, Function]
  }
) {
  
  // Boolean for whether save button in popup window is pressed
  const [save, setSave] = React.useState(false);
  
  // If save is pressed in popup, pass to parent component for database modification
  React.useEffect(() => {
    if (save) {
    setTuteeUpdate(true);
    setPopupOpen(false);
    setSave(false);
    }
  },[save]);

  const handlePopUp = () => {
    setPopupOpen(true);
  };
  
  return (
    <Paper variant="outlined" style={{ width: '80%', margin: 'auto' }}>

    <GeneralInfoPopup 
      data={[data, setData]}
      save={[save, setSave]}
      open={[popupOpen, setPopupOpen]}
      tutor={false} 
    />

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
      <TuteeInformation 
        data={[data, setData]} 
      />

    </Stack>
    </Paper>
  );
  }