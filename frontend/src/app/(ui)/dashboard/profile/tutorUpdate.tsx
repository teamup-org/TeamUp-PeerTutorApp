import * as React from 'react';

import EditIcon 
  from '@mui/icons-material/Edit';

import { Stack, Paper, Typography, Divider, Button, IconButton}
    from '@mui/material'

import GeneralInfoPopup
    from './popup';
  
import TutorInformation
    from './tutorInfo';

import { CoursePreferences, LocationPreferences, TimePreferences } 
    from './preferences';

export default function TutorUpdatePage(props: any) {
    const { popupOpen, setPopupOpen, setTimeUpdate, setLocationUpdate, setTranscript, data, setData, setTutorUpdate, setEligibleUpdate, setCoursePreferencesUpdate } = props;
  
    // Boolean for whether save button in popup window is pressed
    const [save, setSave] = React.useState(false);
  
    // If save is pressed in popup, pass to parent component for database modification
    React.useEffect(() => {
      if (save) {
        setTutorUpdate(true);
        setPopupOpen(false);
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
  
          <GeneralInfoPopup setSave={setTutorUpdate} data={data} setData={setData} open={popupOpen} setOpen={setPopupOpen} tutor={true} />
  
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
              <TutorInformation data={data} />
  
            </Stack>
          </Paper>
  
          <Paper variant="outlined">
            <Stack direction="column" style={{ padding: '20px', flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Here is Your Current Course Information!! You can update your transcript or course preferences here!
              </Typography>
              <Divider style={{ marginBottom: '20px' }} />
              <CoursePreferences setTranscript={setTranscript} data={data} setData={setData} />
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
            <LocationPreferences data={data} setData={setData}  />
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
            <TimePreferences setTimeUpdate={setTimeUpdate} data={data} setData={setData}  />
          </Stack>
        </Paper>
      </Stack>
    );
  }