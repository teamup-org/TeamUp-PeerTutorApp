'use client'


import * as React from 'react';

import { useSession }
  from 'next-auth/react';

import { Stack, Skeleton, TextField, Grid, Button, Typography, Divider, Avatar, Paper, Tab, Tabs, Snackbar,
  Alert, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Checkbox, } 
  from '@mui/material';

import { TableFetch, TablePush }
  from '@/app/_lib/data';
import { scheduleToTimes }
  from '@/app/_lib/utils';


const tabLabels = ["Peer Tutor Profile Information", "Tutee Profile Information"];

interface EditableProfileFieldProps {
  label: string;
  value: string | number;
  onSave: (newValue: string | number) => void;
}

function EditableProfileField({ label, value, onSave }: EditableProfileFieldProps) {
  const [editMode, setEditMode] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState(value);

  // Update editedValue when value changes
  React.useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    onSave(editedValue);
    setEditMode(false);
  };

  return (
    <>
      <TextField
        label={label}
        value={editedValue}
        onChange={(event) => setEditedValue(event.target.value)}
        InputProps={{
          readOnly: !editMode,
        }}
        fullWidth
        multiline={label === "Bio Text"}
        rows={label === "Bio Text" ? 4 : 1}
      />
      {editMode ? (
        <Button onClick={handleSave}>Save</Button>
      ) : (
        <Button onClick={handleToggleEditMode}>Edit</Button>
      )}
    </>
  );
}

function TuteeUpdatePage(props: any) {
  const { tuteeProfileData, setTuteeProfileData, setTuteeUpdate } = props;

  const handleInputChange = (field: keyof typeof tuteeProfileData) => (newValue: string | number) => {
    setTuteeProfileData({ ...tuteeProfileData, [field]: newValue });
  };

  const handleGeneralUpdate = () => {
    setTuteeUpdate(true);
  };

  return (
    <Paper variant="outlined" style={{ width: '80%', margin: 'auto', marginTop: 50, display: 'flex' }}>
      <Stack direction="column" style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          General Info
        </Typography>
        <Divider style={{ marginBottom: '20px' }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <EditableProfileField
              label="First Name"
              value={tuteeProfileData.firstName}
              onSave={handleInputChange('firstName')}
            />
          </Grid>
          <Grid item xs={6}>
            <EditableProfileField
              label="Last Name"
              value={tuteeProfileData.lastName}
              onSave={handleInputChange('lastName')}
            />
          </Grid>
          <Grid item xs={6}>
            <EditableProfileField
              label="Phone Number"
              value={tuteeProfileData.phoneNumber}
              onSave={handleInputChange('phoneNumber')}
            />
          </Grid>
          <Grid item xs={6}>
            <EditableProfileField
              label="Major Abbreviation"
              value={tuteeProfileData.majorAbbreviation}
              onSave={handleInputChange('majorAbbreviation')}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleGeneralUpdate}>
          Update My General Information!
        </Button>
      </Stack>
    </Paper>
);

}

function EligibleCoursesTable(props: any) {
  const {tutorProfileData, setTutorProfileData, setTranscript} = props

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setTranscript(file);
    } else {
      setTranscript("");
    }
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const course = tutorProfileData?.eligibleCourses[index];
    const courseIdentifier = `${course.majorAbbreviation} ${course.courseNumber}`;
    const updatedTutorProfileData = { ...tutorProfileData };

    if (isChecked) {
      updatedTutorProfileData.coursePreferences.push(course);
    } else {
      const courseIndex = updatedTutorProfileData.coursePreferences.findIndex((c: any) => `${c.majorAbbreviation} ${c.courseNumber}` === courseIdentifier);
      if (courseIndex !== -1) {
        updatedTutorProfileData.coursePreferences.splice(courseIndex, 1);
      }
    }

    setTutorProfileData(updatedTutorProfileData);
  };

  return (
    <div >
        <TableContainer sx={{ maxHeight: '75vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Preferred</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutorProfileData?.eligibleCourses.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{`${item.majorAbbreviation} ${item.courseNumber}`}</TableCell>
                  <TableCell>{item.courseGrade}</TableCell>
                  <TableCell>
                  <Checkbox
                    checked={tutorProfileData?.coursePreferences.some((c: any) => `${c.majorAbbreviation} ${c.courseNumber}` === `${item.majorAbbreviation} ${item.courseNumber}`)}
                    onChange={(event) => handleCheckboxChange(index, event.target.checked)}
                  />
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginBottom: '5vh', marginTop: '5vh' }}>
          <form id="uploadForm">
            <div>
              <label>Upload your most current transcript: </label>
              <input type="file" accept=".pdf" onChange={handleFileChange} required/>
            </div>
          </form>
        </div>
        </div>
  );

}

function LocationPreferences(props: any) {

  const { tutorProfileData, setTutorProfileData } = props;
  
  const locationOptions: LocationType[] = [
    "in-person on-campus",
    "in-person off-campus",
    "online"
  ];

  const locationChange = (location: LocationType) => {
    const locationObject = { locationName: location, tutorEmail: tutorProfileData.email };
  
    if (tutorProfileData.locationPreferences.some((loc: { locationName: LocationType; tutorEmail: string; }) => loc.locationName === location)) {
      const updatedLocationPreferences = tutorProfileData.locationPreferences.filter((loc: { locationName: LocationType; tutorEmail: string; }) => loc.locationName !== location);
      setTutorProfileData({ ...tutorProfileData, locationPreferences: updatedLocationPreferences });
    } else {
      const updatedLocationPreferences = [...tutorProfileData.locationPreferences, locationObject];
      setTutorProfileData({ ...tutorProfileData, locationPreferences: updatedLocationPreferences });
    }
  };

  return (
    <div style={{ marginBottom: '2vh' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Preferred</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationOptions.map((location, index) => (
                <TableRow key={index}>
                  <TableCell>{location}</TableCell>
                  <TableCell>
                  <Checkbox
                    checked={tutorProfileData.locationPreferences.some((loc: { locationName: LocationType; email: string; }) => loc.locationName === location)}
                    onChange={() => locationChange(location)}
                  />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );

}

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput }
  from '@fullcalendar/core/index.js';

import type { DateSelectArg, EventClickArg, EventDropArg, EventAddArg } 
  from '@fullcalendar/core/index.js';


function TimePreferences(props: any) {
  const { tutorProfileData, setTutorProfileData, setTimeUpdate } = props;

  const scheduleRef = React.useRef<FullCalendar | null>(null);
  var selectedEvent: EventClickArg;

  const Day: { [key: string]: number } = { 
    "sunday": 0, 
    "monday": 1, 
    "tuesday": 2, 
    "wednesday": 3, 
    "thursday": 4, 
    "friday": 5, 
    "saturday": 6 
  };

  const userEmail = useSession()?.data?.user?.email;
  const { data: tutor } = TableFetch<TutorQuery>("tutor", [userEmail], `email_contains=${userEmail}`);
  const [events, setEvents] = React.useState<EventInput[]>();

  React.useEffect(() => {
    setEvents(tutor?.data[0].timePreferences.map<EventInput>((time) => (
      {
        startTime: time.startTimeString,
        endTime: time.endTimeString,
        daysOfWeek: [ Day[time.weekdayName] ],
      }
    )));
  }, [tutor]);

  const handleEventRemove = () => {
    if (selectedEvent) selectedEvent.event.remove();
  };

  const handleEventSubmit = () => {
    const timeEvents = scheduleToTimes(scheduleRef);
    let times: TutorTimePreference[] = [];

    timeEvents?.map((timeSlot, index) => {
      times.push({tutorEmail: tutorProfileData.email,
                            weekdayName: timeSlot.dow[0],
                            startTimeString: timeSlot.time[0],
                            endTimeString: timeSlot.time[1]})
    });

    setTutorProfileData({
      ...tutorProfileData,
      timePreferences: times
    });

    setTimeUpdate(true);

  };

  // Callback function after releasing click on date selection
  const handleDateSelect = (event: DateSelectArg) => {
    scheduleRef.current?.getApi().addEvent(event);
    scheduleRef.current?.getApi().unselect();
  };

  // Callback function after clicking event
  const handleEventClick = (info: EventClickArg) => {
    if (selectedEvent) selectedEvent.el.style.outline = "";
    info.el.style.outline = "2px solid black";
    selectedEvent = info;
  };

  return (
    <FullCalendar
      ref={scheduleRef}
      plugins={[ interactionPlugin, dayGridPlugin, timeGridPlugin ]}
      events={events}

      initialView="timeGridWeek"
      height="70vh"
      headerToolbar={{
        left: 'deleteTime',
        right: 'submitTimes',
      }}
      dayHeaderFormat={{ weekday: 'long' }}
      customButtons={{
        deleteTime: {
          text: 'Remove Selected Time',
          click: handleEventRemove,
        },
        submitTimes: {
          text: 'Submit Time Preferences',
          click: handleEventSubmit,
        }
      }}

      allDaySlot={false} slotDuration="00:15:00" slotLabelInterval="01:00"
      unselectAuto={false} editable selectable selectMirror selectOverlap={false} eventOverlap={false}
      eventClick={handleEventClick} select={handleDateSelect}
    />
  );
}

function TutorUpdatePage(props: any) {
  const { setTimeUpdate, setLocationUpdate, setTranscript, tutorProfileData, setTutorProfileData, setTutorUpdate, setEligibleUpdate, setPreferencesUpdate } = props;

  const handleInputChange = (field: keyof typeof tutorProfileData) => (newValue: string | number) => {
    setTutorProfileData({ ...tutorProfileData, [field]: newValue });
  };

  const handleGeneralUpdate = () => {
    setTutorUpdate(true);
  };

  const handleEligibleCoursesUpdate = () => {
    setEligibleUpdate(true);
  };

  const handleCoursePreferencesUpdate = () => {
    setPreferencesUpdate(true);
  };

  const handleLocationPreferencesUpdate = () => {
    setLocationUpdate(true);
  }

  return (
    <Stack direction="column" spacing={4} m={4}>
      <Stack direction="row" spacing={2} mx={2}>
        <Paper variant="outlined">

          <Stack direction="column" p={2} style={{ flexGrow: 1 }}>

            <Typography variant="h6" gutterBottom>
              General Info
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <EditableProfileField
                  label="First Name"
                  value={tutorProfileData.firstName}
                  onSave={handleInputChange('firstName')}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableProfileField
                  label="Last Name"
                  value={tutorProfileData.lastName}
                  onSave={handleInputChange('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <EditableProfileField
                  label="Phone Number"
                  value={tutorProfileData.phoneNumber}
                  onSave={handleInputChange('phoneNumber')}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableProfileField
                  label="Major Abbreviation"
                  value={tutorProfileData.majorAbbreviation}
                  onSave={handleInputChange('majorAbbreviation')}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableProfileField
                  label="Pay Rate"
                  value={tutorProfileData.payRate}
                  onSave={handleInputChange('payRate')}
                />
              </Grid>
              <Grid item xs={12}>
                <EditableProfileField
                  label="Listing Title"
                  value={tutorProfileData.listingTitle}
                  onSave={handleInputChange('listingTitle')}
                />
              </Grid>
              <Grid item xs={12}>
                <EditableProfileField
                  label="Bio Text"
                  value={tutorProfileData.bioText}
                  onSave={handleInputChange('bioText')}
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleGeneralUpdate}>
              Update My General Information!
            </Button>

          </Stack>
        </Paper>

        <Paper variant="outlined">
          <Stack direction="column" style={{ padding: '20px', flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Here is Your Current Course Information!! You can update your transcript or course preferences here!
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />
            <EligibleCoursesTable setTranscript={setTranscript} tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData} />
            <Button variant="contained" color="primary" onClick={handleEligibleCoursesUpdate}>
              Update My Eligible Courses!
            </Button>
            <Button variant="contained" color="primary" onClick={handleCoursePreferencesUpdate}>
              Update My Course Preferences!
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
          <LocationPreferences tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData}  />
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
          <TimePreferences setTimeUpdate={setTimeUpdate} tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData}  />
        </Stack>
      </Paper>
    </Stack>
  );
}


function ProfilePage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = React.useState(0);
  const [tutorUpdate, setTutorUpdate] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [eligibleUpdate, setEligibleUpdate] = React.useState(false);
  const [preferencesUpdate, setPreferencesUpdate] = React.useState(false);
  const [locationUpdate, setLocationUpdate] = React.useState(false);
  const [tuteeUpdate, setTuteeUpdate] = React.useState(false);
  const [timeUpdate, setTimeUpdate] = React.useState(false);
  const [transcript, setTranscript] = React.useState<File>();

  const [tutorProfileData, setTutorProfileData] = React.useState<Tutor>({
    activeStatusName: "active",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    pictureUrl: "",
    listingTitle: "",
    bioText: "",
    averageRating: 0,
    numberOfRatings: 0,
    coursePreferences: [],
    eligibleCourses: [],
    locationPreferences: [],
    timePreferences: [],
    majorAbbreviation: "",
    payRate: 0,
    seniorityName: "Senior",
    numberOneStarRatings: 0,
    numberTwoStarRatings: 0,
    numberThreeStarRatings: 0,
    numberFourStarRatings: 0,
    numberFiveStarRatings: 0,
  });

  const [tuteeProfileData, setTuteeProfileData] = React.useState<Tutee>({
    activeStatusName: "active",
    email: "",
    firstName: "",
    lastName: "",
    majorAbbreviation: "",
    phoneNumber: 0,
    seniorityName: "Senior",
    pictureUrl: ""
  });

  const { data: tutorData, isLoading: tutorIsLoading, isFetching: tutorIsFetching, isSuccess: tutorIsSuccess, refetch: tutorRefetch } = 
    TableFetch<TutorQuery>("tutor", [session], `email_contains=${session?.user?.email}`);
    
  const { data: tuteeData, isLoading: tuteeIsLoading, isFetching: tuteeIsFetching, isSuccess: tuteeIsSuccess, refetch: tuteeRefetch } = 
    TableFetch<TuteeQuery>("tutee", [session], `email_contains=${session?.user?.email}`);
    
  const tutorMutationUpdate = TablePush("/tutor/update");
  const tutorTimeMutationUpdate = TablePush("/tutor_time_preference/update");
  const tuteeMutationUpdate = TablePush("/tutee/update");

  React.useEffect(() => {

    if (tutorUpdate) {
      updateTutorInformation();
    }

  }, [tutorUpdate]);

  React.useEffect(() => {

    if (eligibleUpdate) {
      updateTutorEligbleCourses();
    }

  }, [eligibleUpdate]);

  React.useEffect(() => {

    if (locationUpdate) {
      updateTutorLocationPreferences();
    }

  }, [locationUpdate]);

  React.useEffect(() => {

    if (preferencesUpdate) {
      updateTutorCoursePreferences();
    }

  }, [preferencesUpdate]);

  React.useEffect(() => {

    if (timeUpdate) {
      updateTutorTimePreferences();
    }

  }, [timeUpdate]);

  React.useEffect(() => {

    if (tuteeUpdate) {
      updateTuteeInformation();
    }

  }, [tuteeUpdate]);
  
  React.useEffect(() => {
    if (tutorData?.data && (tutorData.data.length > 0)) {
      setTutorProfileData(tutorData?.data[0]);
    }
  }, [tutorData]);

  React.useEffect(() => {
    if (tuteeData && (tuteeData.length > 0)) {
      setTuteeProfileData(tuteeData[0]);

    }
  }, [tuteeData]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const generateLocationString = (locations: { locationName: LocationType; tutorEmail: string; }[]): string => {
    const locationNames = locations.map(location => location.locationName);
    return locationNames.join(", ");
  };

  function formatTimePreferences(timePreferences: any[]): any {
    const formattedData: any = {};
  
    // Iterate through timePreferences array
    timePreferences.forEach((timePreference) => {
      const { tutorEmail, weekdayName, startTimeString, endTimeString } = timePreference;
  
      // Check if there's already an entry for the current day
      if (!formattedData[weekdayName]) {
        // If not, create an entry for the current day
        formattedData[weekdayName] = [];
      }
  
      // Add the time interval to the corresponding day
      formattedData[weekdayName].push(`${startTimeString} ${endTimeString}`);
    });
  
    // Create the final object with email and time intervals for each day
    const result: any = {};

    result.tutor_email = session?.user?.email;

    timePreferences.forEach((timePreference) => {
      const { tutorEmail, weekdayName } = timePreference;
  
      if (formattedData[weekdayName]) {
        if (!result[`${weekdayName}_time_intervals`]) {
          result[`${weekdayName}_time_intervals`] = formattedData[weekdayName].join(', ');
        }
      }
    });
  
    return result;
  }
  
  const updateTutorTimePreferences = () => {

    tutorTimeMutationUpdate.mutate(formatTimePreferences(tutorProfileData.timePreferences), {
      onSuccess: () => {
        successfulUpdate();
        tutorRefetch();
      },
    });
    setTimeUpdate(false);

  };

  const updateTutorLocationPreferences = () => {

    setLocationUpdate(false);

    const newLocation = {
      email_old: tutorProfileData.email,
      location_preferences_new: generateLocationString(tutorProfileData.locationPreferences)
    }

    if (!newLocation.location_preferences_new) {
      errorUpdate("Please select at least one location preference");
      return;
    }
    
    tutorMutationUpdate.mutate(newLocation, {
      onSuccess: () => {
        successfulUpdate();
        tutorRefetch();
      },
    });
    

  };

  const updateTutorEligbleCourses = () => {

    setEligibleUpdate(false);

    const newEligible = {
      email_old: tutorProfileData.email,
      transcript: transcript
    }

    if (!newEligible.transcript) {
      errorUpdate("Please upload a transcript");
      return;
    }

    tutorMutationUpdate.mutate(newEligible, {
      onSuccess: () => {
        successfulUpdate();
        tutorRefetch();
      },
    });

  };

  const successfulUpdate = () => {
    setAlertOpen(true);
    setAlertMessage("success");
  }

  const errorUpdate = (message: string) => {
    setAlertOpen(true);
    setAlertMessage(message);
  }

  const TutorGeneralInfoErrorChecking = (formData: any) => {
    
    if (formData.firstName.length > 20) {
      return "First name must be 20 characters or less.";
    }
  
    // Check lastName length
    if (formData.lastName.length > 20) {
        return "Last name must be 20 characters or less.";
    }

    // Check phoneNumber
    if (!/^[1-9]\d{9}$/.test(formData.phoneNumber)) {
        return("Phone number must be 10 digits long and contain only numbers.");
    }

    // Check payRate
    const payRateNum = parseFloat(formData.payRate);
    if (isNaN(payRateNum) || payRateNum < 0 || payRateNum > 1000) {
        return("Pay rate must be a non-negative number less than $1,000.");
    }

    // Check title length
    if (formData.listingTitle.length > 100) {
      return "Title must be 100 characters or less.";
    }

    // Check bioText length
    if (formData.bioText.length > 1000) {
        return "Bio text must be 1000 characters or less.";
    }

    return('');
  }

  const TuteeGeneralInfoErrorChecking = (formData: any) => {
    
    if (formData.firstName.length > 20) {
      return "First name must be 20 characters or less.";
    }
  
    // Check lastName length
    if (formData.lastName.length > 20) {
        return "Last name must be 20 characters or less.";
    }

    // Check phoneNumber
    if (!/^[1-9]\d{9}$/.test(formData.phoneNumber)) {
        return("Phone number must be 10 digits long and contain only numbers.");
    }

    return('');
  }

  const generateCourseString = (courses: Course[]): string => courses.map(course => `${course.majorAbbreviation} ${course.courseNumber} ${course.courseGrade}`).join(", ");

  const updateTutorCoursePreferences = () => {

    setPreferencesUpdate(false);

    const newPreferences = {
      email_old: tutorProfileData.email,
      course_preferences_new: generateCourseString(tutorProfileData?.coursePreferences)
    }

    if (!newPreferences.course_preferences_new) {
      errorUpdate("Please select at least one course preference");
      return;
    }

    tutorMutationUpdate.mutate(newPreferences, {
      onSuccess: () => {
        successfulUpdate();
        tutorRefetch();
      },
    });

  };

  const updateTutorInformation = () => {

    setTutorUpdate(false);

    // Error Checking
    const errors = TutorGeneralInfoErrorChecking(tutorProfileData);
    if (errors) {
      errorUpdate(errors);
      return;
    }

    const newTutorInformation = {
      // Unique Key
      email_old: tutorProfileData.email,

      first_name_new: tutorProfileData.firstName, last_name_new: tutorProfileData.lastName,
      phone_number_new: tutorProfileData.phoneNumber,
      major_abbreviation_new: tutorProfileData.majorAbbreviation, pay_rate_new: tutorProfileData.payRate,

      listing_title_new: tutorProfileData.listingTitle,
      bio_text_new: tutorProfileData.bioText,
    }

    tutorMutationUpdate.mutate(newTutorInformation, {
      onSuccess: () => {
        successfulUpdate();
        tutorRefetch();
      },
    });
  };

  const updateTuteeInformation = () => {

    setTuteeUpdate(false);

    const newTuteeInformation = {
      email_old: tuteeProfileData.email,
      active_status_name_new: tuteeProfileData.activeStatusName,
      first_name_new: tuteeProfileData.firstName,
      last_name_new: tuteeProfileData.lastName,
      major_abbreviation_new: tuteeProfileData.majorAbbreviation,
      phone_number_new: tuteeProfileData.phoneNumber,
      seniority_name_new: tuteeProfileData.seniorityName
    }

    const error = TuteeGeneralInfoErrorChecking(tuteeProfileData);

    if (error) {
      errorUpdate(error);
      return;
    }

    tuteeMutationUpdate.mutate(newTuteeInformation, {
      onSuccess: () => {
        successfulUpdate();
        tuteeRefetch();
      },
    });
    
  };

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setAlertOpen(false);
  };

  return (
    <div style={{ paddingTop: '30px'}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar src={session?.user?.image?.toString()} alt="" style={{ marginRight: '10px' }} />
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
      </div>
        <Tabs value={tab} onChange={handleChangeTab} centered>
          <Tab label={tabLabels[0]} />
          <Tab label={tabLabels[1]} />
        </Tabs>


      {(() => {

        // Tutor Update Page
        if (tab === 0) {

          // Initial Fetch Complete
          if (tutorIsSuccess) {

            // If tutor exists
            if (tutorData?.data?.length > 0) {
              return (
                <>
                <TutorUpdatePage setTranscript={setTranscript} setTimeUpdate={setTimeUpdate} setLocationUpdate={setLocationUpdate} setEligibleUpdate={setEligibleUpdate} setPreferencesUpdate={setPreferencesUpdate} setTutorUpdate={setTutorUpdate} tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData} />
                </>
              );
            }

            // If Tutor doesn't exists
            else {
              return (
                <>
                <Paper variant="outlined" style={{ padding: '20px', textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                    We cannot find a Tutor Account with this Email
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    <Button variant="contained" color="primary" href='/register'>
                      Click Here to Register!!
                    </Button>
                  </Typography>
                </Paper>
                </>
              );
            }

          }

          // Data is loading in
          else {
            return (
              <>
              <Skeleton animation="wave" variant="rounded" width="100%"> </Skeleton>
              </>
            );
          }

        }

        // Tutee Update Page
        if (tab === 1) {

          // Initial Fetch complete
          if (tuteeIsSuccess) {

            // If tutee exists
            if (tuteeData?.length > 0) {
              return (
                <>
                <TuteeUpdatePage setTuteeUpdate={setTuteeUpdate} tuteeProfileData={tuteeProfileData} setTuteeProfileData={setTuteeProfileData} />
                </>
              );
            }

            // If Tutee doesn't exists
            else {
              return (
                <>
                <Paper variant="outlined" style={{ padding: '20px', textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                    We cannot find a Tutee Account with this Email
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    <Button variant="contained" color="primary" href='/register'>
                      Click Here to Register!!
                    </Button>
                  </Typography>
                </Paper>
                </>
              );
            }
          }

          // Data is loading
          else if (tuteeIsFetching || tuteeIsLoading) {
            return (
              <>
              <Skeleton animation="wave" variant="rounded" width="100%"> </Skeleton>
              </>
            );
          }
        }

        return (<></>);

      })()}

      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={alertOpen} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity={alertMessage === "success" ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {alertMessage === "success" ? "Profile Successfully Updated"
                                      : alertMessage }
        </Alert>
      </Snackbar>
        
    </div>
  );
}

export default ProfilePage;
