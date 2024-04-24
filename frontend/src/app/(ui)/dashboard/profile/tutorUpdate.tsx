import * as React from 'react';

import EditIcon 
  from '@mui/icons-material/Edit';

import { Stack, Paper, Typography, Divider, Button, IconButton}
  from '@mui/material'

import { GeneralInfoPopup}
  from './popup';
  
import { TutorInformation }
  from './tutorInfo';

import { CoursePreferences, LocationPreferences, TimePreferences } 
  from './preferences';

/**
 * Component for displaying tutor profile page
 * @param popupOpen - State variable for tracking status of edit popup 
 * @param timeUpdate - State variable for triggering time preferences update
 * @param locationUpdate - State variable for triggering location preferences update
 * @param eligibleUpdate - State variable for triggering eligible courses update
 * @param coursePreferencesUpdate - State variable for triggering course preferences update
 * @param tutorUpdate - State variable for triggering tutor information update
 * @param data - Tutor Data
 * @param transcript - Tutor Transcript
 * @returns 
 */
export function TutorUpdatePage(
  {popupOpen               : [popupOpen, setPopupOpen],
   timeUpdate              : [timeUpdate, setTimeUpdate],
   locationUpdate          : [locationUpdate, setLocationUpdate],
   eligibleUpdate          : [eligibleUpdate, setEligibleUpdate],
   coursePreferencesUpdate : [coursePreferencesUpdate, setCoursePreferencesUpdate],
   tutorUpdate             : [tutorUpdate, setTutorUpdate],
   data                    : [data, setData],
   transcript              : [transcript, setTranscript]}
  :
  {popupOpen               : [boolean, Function],
   timeUpdate              : [boolean, Function],
   locationUpdate          : [boolean, Function],
   eligibleUpdate          : [boolean, Function],
   coursePreferencesUpdate : [boolean, Function],
   tutorUpdate             : [boolean, Function],
   data                    : [Tutor, Function],
   transcript              : [Object | undefined, Function]
  }
) {
  
  // Boolean for whether save button in popup window is pressed
  const [save, setSave] = React.useState(false);
  
  // If save is pressed in popup, pass to parent component for database modification
  React.useEffect(() => {
    if (save) {
    setTutorUpdate(true);
    setPopupOpen(false);
    setSave(false);
    }
  },[save]);

  // Set State variables for modifying database
  const handleEligibleCoursesUpdate = () => {
    setEligibleUpdate(true);
  };
  
  const handleCoursePreferencesUpdate = () => {
    setCoursePreferencesUpdate(true);
  };
  
  const handleLocationPreferencesUpdate = () => {
    setLocationUpdate(true);
  }
  
  const handlePopUp = () => {
    setPopupOpen(true);
  };
  
  return (
    <Stack direction="column" spacing={4} m={4}>
    <Stack direction="row" spacing={2} mx={2}>
      <Paper variant="outlined">
  
      <GeneralInfoPopup 
        open={[popupOpen, setPopupOpen]}
        data={[data, setData]}
        save={[save, setSave]}
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
        <TutorInformation 
          data={[data, setData]}
        />
  
      </Stack>
      </Paper>
  
      <Paper variant="outlined">
      <Stack direction="column" style={{ padding: '20px', flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
        Here is Your Current Course Information!! You can update your transcript or course preferences here!
        </Typography>
        <Divider style={{ marginBottom: '20px' }} />
        <CoursePreferences 
          data={[data, setData]}
          transcript={[transcript, setTranscript]}
        />
        <Button variant="contained" color="primary" onClick={handleEligibleCoursesUpdate}>
        Update My Transcript!
        </Button>
        <Button variant="contained" color="primary" onClick={handleCoursePreferencesUpdate}>
        Update My Preferred Courses!
        </Button>
      </Stack>
      </Paper>
    </Stack>
    
    <Paper variant="outlined">
      <Stack style={{ padding: '20px', flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Update your Location Preferences Here!!
      </Typography>
      <Divider style={{ marginBottom: '20px' }} />
      <LocationPreferences 
        data={[data, setData]}
      />
      <Button variant="contained" color="primary" onClick={handleLocationPreferencesUpdate}>
        Update My Location Preferences!
      </Button>
      </Stack>
    </Paper>
  
    <Paper variant="outlined">
      <Stack style={{ padding: '20px', flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Update your Time Preferences Here!!
      </Typography>
      <Divider style={{ marginBottom: '20px' }} />
      <TimePreferences 
        timeUpdate={[timeUpdate, setTimeUpdate]}
        data={[data, setData]}
      />
      </Stack>
    </Paper>
    </Stack>
  );
  }