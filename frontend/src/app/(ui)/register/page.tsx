'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

import ResponsiveAppBar from '../app-bar'
import { Login, HowToReg } from '@mui/icons-material'
import TutorCard from '../tutor-card';
const links = [
  {name: 'Login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
];
const tabLabels = ["Register as Peer Tutor", "Register as Tutee"];

import { 
  Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, InputLabel, MenuItem, Select, SelectChangeEvent,
  OutlinedInput, InputAdornment, Tabs, Tab, Step, Stepper, StepLabel, FormGroup, Checkbox, FormControlLabel, Alert, Skeleton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider
} from '@mui/material';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useTuteeMutation, TableFetch, TablePush } from '@/app/_lib/data';
import { Dashboard, School, CalendarMonth } 
from '@mui/icons-material';

import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';


import axios from 'axios';
import { truncate } from 'fs/promises';
const development = "http://localhost:8080";
const deployment = "https://tamutheo.xyz/database_api";
axios.defaults.baseURL = development;

const steps = ['General Info', 'Transcript', 'Submit Registration','Tutor Preferences'];

const settings: Link[] = [
  { name: 'Profile', href: '/dashboard/profile', icon: Dashboard },
  { name: 'Log Out', href: '/', icon: Dashboard },
];

function PeerTutorForm(props: any) {

  const { formData, setFormData } = props;  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const seniorityOptions = [
    { value: 'Freshman', label: 'Freshman' },
    { value: 'Sophomore', label: 'Sophomore' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Graduate', label: 'Graduate Student' }
  ];
  
  const changeSeniority = (event: SelectChangeEvent) => {
    setFormData((prevData: any) => ({ ...prevData, ['seniority']: event.target.value as Seniority}));
  };


  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number (No dashes or spaces)"
            name="phoneNumber"
            autoComplete="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="title"
            label="Title (Ex. Computer Science Tutor)"
            name="title"
            autoComplete="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputLabel id="senioritySelect">Seniority</InputLabel>
        <Select
          labelId="seniorityLabel"
          id="seniority"
          value={formData.seniority}
          label="seniority"
          onChange={changeSeniority}
          defaultValue=''
        >
          {seniorityOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="payrate">Pay Rate/Hr</InputLabel>
          <OutlinedInput
            name="payRate"
            id="payrate"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="payrate"
            value={formData.payRate}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="major"
            label="Undergraduate Department (4 letter abbreviation)"
            name="major"
            autoComplete="major"
            value={formData.major}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="bioText"
            label="Biography Text (This can be changed later)"
            name="bioText"
            autoComplete="bioText"
            multiline  // Add this prop for multiline textarea
            rows={4}   // Optionally set the number of rows
            value={formData.bioText}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </Box>
  );
}

function TuteeForm(props: any) {

  const seniorityOptions = [
    { value: 'freshman', label: 'Freshman' },
    { value: 'sophomore', label: 'Sophomore' },
    { value: 'junior', label: 'Junior' },
    { value: 'senior', label: 'Senior' },
    { value: 'graduate', label: 'Graduate Student' }
  ];
  
  const [seniority, setSeniority] = React.useState('');

  const { setTuteeRegistered } = props;
  
  const changeSeniority = (event: SelectChangeEvent) => {
    setSeniority(event.target.value as string);
  };

  // Google Account Specific Info ----------------------------------------

  const { data: session, status } = useSession();

  // Form submission -----------------------------------------------------

  const { mutate } = useTuteeMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const registrationData = {
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      phone_number: formData.get('phoneNumber') as string,
      seniority_name: seniority,
      email: session?.user?.email as string,
      major_abbreviation: formData.get('major') as string,
      picture_url: session?.user?.image as string
    };
    
    mutate(registrationData);

    setTuteeRegistered(true);

  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number (No dashes or spaces)"
            name="phoneNumber"
            autoComplete="phoneNumber"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputLabel id="senioritySelect">Seniority</InputLabel>
        <Select
          labelId="seniorityLabel"
          id="seniority"
          value={seniority}
          label="seniority"
          onChange={changeSeniority}
        >
          {seniorityOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="major">Undergrad Major (4 letters)</InputLabel>
          <OutlinedInput
            name="major"
            id="major"
            label="Major"
          />
        </Grid>

      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
    </Box>
  );
}

function TranscriptUpload(props: any) {
  const { setTranscript } = props;
  
  useEffect(() => {
    setTranscript(null);  
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Access the first file in the files array
      const file = files[0];
      setTranscript(file);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
    <Typography component="h2" variant="h5"> Please upload a pdf of your most current transcript </Typography>
    <form id="uploadForm">
      <div >
        <label>Select Transcript File: </label>
        <input type="file" accept=".pdf" onChange={handleFileChange} required/>
      </div>
    </form>
  </div>
  );
}

function TutorCardPage(props: any) {

  const { tutor } = props;

  return (
    <Grid container rowSpacing={3}>
    <Grid item xs={12}> <Typography align="center"> Here is your Tutor Card!! </Typography> </Grid>
    <Grid item xs={12}> <TutorCard tutor={tutor} /> </Grid>
    <Grid item xs={12}> 
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
      </Box>
    </Grid>
  </Grid>
  );


}

function CoursePreferences(props: any) {

  const { eligibleCourses } = props;
  const { checkedItems, setCheckedItems} = props;
  const { locationPreferences, setLocationPreferences } = props;
  const { timePreferences, setTimePreferences } = props;
  const { tutorTimePreferences, setTutorTimePreferences } = props;

  const { data: session, status } = useSession();

  const locationOptions: LocationType[] = [
    "in-person on-campus",
    "in-person off-campus",
    "online"
  ];

  const handleCheckboxChange = (index: number) => {
    setCheckedItems({
      ...checkedItems,
      [index]: !checkedItems[index]
    });
  };

  const locationChange = (location: LocationType) => {
    if (locationPreferences.includes(location)) {
      setLocationPreferences(locationPreferences.filter((l: LocationType) => l !== location));
    } else {
      setLocationPreferences([...locationPreferences, location]);
    }
  };

  const handleTimeChange = (index: number, field: string, value: string) => {
    const updatedTimes = [...timePreferences];
    updatedTimes[index][field] = value;
    setTimePreferences(updatedTimes);
  };

  const addRow = () => {
    setTimePreferences([...timePreferences, { day: '', startTime: dayjs(), endTime: dayjs() }]);
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ marginBottom: '15vh' }}>
        <Typography variant="h6">Select the courses you want to Peer Tutor For!</Typography>
        <Divider />
        <TableContainer sx={{ maxHeight: '75vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eligibleCourses.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{`${item.majorAbbreviation} ${item.courseNumber}`}</TableCell>
                  <TableCell>{item.courseGrade}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={checkedItems[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  
      <div style={{ marginBottom: '15vh' }}>
        <Typography variant="h6">Select your location preferences</Typography>
        <Divider />
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationOptions.map((location, index) => (
                <TableRow key={index}>
                  <TableCell>{location}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={locationPreferences.includes(location)}
                      onChange={() => locationChange(location)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  
      <div style={{ marginBottom: '16px' }}>
        <Typography variant="h6">Add your preferred times</Typography>
        <Divider />
        <TableContainer sx={{ maxHeight: '75vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timePreferences.map((time: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>
                    <Select
                      value={time.day}
                      onChange={(e) => handleTimeChange(index, 'day', e.target.value as string)}
                    >
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                      <MenuItem value="Sunday">Sunday</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimeField']}>
                        <TimeField
                          value={time.startTime}
                          onChange={(newValue) => handleTimeChange(index, 'startTime', newValue || '')}
                          fullWidth
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimeField']}>
                        <TimeField
                          value={time.endTime}
                          onChange={(newValue) => handleTimeChange(index, 'endTime', newValue || '')}
                          fullWidth
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="outlined" onClick={addRow} style={{ marginTop: '8px' }}>
          Add Time
        </Button>
      </div>
    </div>
  );
  

}

export default function Registration() {

  // Variable Initializing ------------------------------------------------------------------------

  const [tutorRegistered, setTutorRegistered] = useState(false);   // This will be set to true when registration is submitted
  const [tuteeRegistered, setTuteeRegistered] = useState(false);   // This will be set to true when registration is submitted
  const [preferencesSet, setPreferencesSet] = useState(false);
  const [tutorRefetched, setTutorRefetched] = useState(false);
  const [tutorTimesSet, setTutorTimesSet] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const [coursePreferences, setCoursePreferences] = useState<Course[]>();
  const [eligibleCourses, setEligibleCourses] = useState<Course[]  | undefined>(undefined);
  const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});
  const [locationPreferences, setLocationPreferences] = useState<LocationType[]>([]);
  const [timePreferences, setTimePreferences] = useState<TimePreference[]>([]);
  const [tutorTimePreferences, setTutorTimePreferences] = useState<TutorTime[]>([]);

  const { data: session, status } = useSession();

  const [activeStep, setActiveStep] = React.useState(0);
  
  const [tab, setTab] = React.useState(0);
  
  const [peerTutorFormData, setPeerTutorFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    title: '',
    payRate: '',
    major: '',
    bioText: '',
    seniority: '' as Seniority
  });

  const [tutor, setTutor] = useState<Tutor>({
    firstName: '',
    lastName: '',
    pictureUrl: '',
    payRate: 0,
    averageRating: 5,
    listingTitle: '',
    bioText: '',
    phoneNumber: -1,
    email: '',
    majorAbbreviation: '',
    seniorityName: 'Senior',
    coursePreferences: [],
    eligibleCourses: [],
    locationPreferences: [],
    activeStatusName: "active",
    numberOfRatings: 0
  });

  // Button and Update Functions -------------------------------------------------------------

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const convertTimeToString = (time: dayjs.Dayjs) => {
    const hour = time.hour().toString().padStart(2, '0');
    const minute = time.minute().toString().padStart(2, '0');
    
    // Always set seconds to '00'
    const second = '00';
    
    // Return the formatted time string
    return `${hour}:${minute}:${second}`;
  };

  const convertPreferenceToString = (time: TimePreference) => {
    const start = time['startTime'];
    const end = time['endTime'];

    return `${convertTimeToString(start)} ${convertTimeToString(end)}`
  };

  const handleNext = () => {
  
    if (tab == 0) {
  
      if (activeStep === 0) {
  
        for (const key in peerTutorFormData) {
          if (!(peerTutorFormData as any)[key] || (peerTutorFormData['seniority'] === "All")) {
            alert("Fill out all fields first before continuing");
            return;
          }
        }
      }
      else if (activeStep === 1) {

        if (!transcript) {
          alert("Please upload a transcript before proceeding");
          return;
        }
  
        const newTutor: Tutor = {
          activeStatusName: 'active',
          firstName: peerTutorFormData.firstName,
          lastName: peerTutorFormData.lastName,
          bioText: peerTutorFormData.bioText,
          listingTitle: peerTutorFormData.title,
          payRate: Number(peerTutorFormData.payRate),
          pictureUrl: session?.user?.image || '',
          phoneNumber: Number(peerTutorFormData.phoneNumber),
          email: session?.user?.email || '',
          majorAbbreviation: peerTutorFormData.major,
          seniorityName: peerTutorFormData.seniority,
          coursePreferences: [],
          eligibleCourses: [],
          locationPreferences: [],
          averageRating: 5,
          numberOfRatings: 0
        };
  
        setTutor(newTutor);
  
      }
      else if (activeStep === 2) {

        TutorCreation();

      }
      else if (activeStep === 3) {

        const newVariables = eligibleCourses?.filter((_: any, index: any) => checkedItems[index]);
        setCoursePreferences(newVariables);

      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Checks to see if account is already registered --------------------------------------------------------------

  const {data: tutorResult, isSuccess: tutorFinished, refetch: tutorRefetch } = TableFetch<TutorQuery>("tutor", [], `email_contains=${session?.user?.email}`);
  const {data: tuteeResult, isSuccess: tuteeFinished, refetch: tuteeRefetch } = TableFetch<TuteeQuery>("tutee", [], `email_contains=${session?.user?.email}`);

  // Operations for database insertions ---------------------------------------------------------------------------

  const tutorMutation = TablePush("/tutor");
  const tutorMutationUpdate = TablePush("/tutor/update");
  const tutorTimeMutationUpdate = TablePush("/tutor_time_preference/update");

  useEffect(() => {

    if (!tutorRegistered) {
      tutorRefetch();
    }

    if (!tuteeRegistered) {
      tuteeRefetch();
    }

  }, [session?.user?.email]);

  useEffect(() => {

    if (tutorMutation.isSuccess) {
      console.log("transcript added");
      setTutorRegistered(true);
      tutorRefetch();
    }

  }, [tutorMutation.isSuccess]);

  useEffect(() => {

    if (tutorRegistered && tutorResult) {

      const courses = tutorResult['data'][0]['eligibleCourses'];
      setEligibleCourses(courses);
    }

  }, [tutorResult]);

  useEffect(() => {
    if (tutorRegistered) {
      setPreferencesSet(true);
      UpdateTutorPreferences();
    }
  }, [coursePreferences])

  useEffect(() => {
    if (eligibleCourses) {
      setTutorRefetched(true);
    }
  }, [eligibleCourses])

  async function TutorCreation() {

    const tutorCreateData = {
      active_status_name: 'active',
      bio_text: tutor.bioText,
      email: tutor.email,
      first_name: tutor.firstName,
      last_name: tutor.lastName,
      listing_title: tutor.listingTitle,
      major_abbreviation: tutor.majorAbbreviation,
      pay_rate: tutor.payRate,
      phone_number: tutor.phoneNumber,
      picture_url: tutor.pictureUrl,
      seniority_name: tutor.seniorityName,
      transcript: transcript,

    }

    tutorMutation.mutate(tutorCreateData);

  }

  useEffect(() => {

    if (tutorTimesSet) {
      tutorTimePreferences.map((time: TutorTime) => (
        tutorTimeMutationUpdate.mutate(time)
      ))
    }

  }, [tutorTimePreferences]);

  async function UpdateTutorPreferences() {

    const generateCourseString = (courses: Course[]): string => courses.map(course => `${course.majorAbbreviation} ${course.courseNumber} ${course.courseGrade}`).join(", ");
    const generateLocationString = (locations: LocationType[]): string => locations.join(", ");

    timePreferences.map((time: TimePreference) => (
      setTutorTimePreferences([...tutorTimePreferences, { weekday_name: time['day'], time_intervals: convertPreferenceToString(time), tutor_email: session?.user?.email || ''}])
    ))

    if (coursePreferences && locationPreferences && timePreferences) {
      const tutorPreferences = { 
        email_old: session?.user?.email,
        course_preferences_new: generateCourseString(coursePreferences),
        location_preferences_new: generateLocationString(locationPreferences)
      }

      tutorMutationUpdate.mutate(tutorPreferences);
      setTutorTimesSet(true);
    }


  }

  return (
    <>
    <header>
      <ResponsiveAppBar settings={settings} links={links} />
    </header>
    <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh'}}>
      <CssBaseline />
      <Paper elevation={4} style={{ width: '80%' }}>
        <Box
          sx={{
            padding: 4,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              marginBottom: 4,
            },
          }}
        >

          <Tabs value={tab} onChange={handleChangeTab} centered>
            <Tab label={tabLabels[0]} />
            <Tab label={tabLabels[1]} />
          </Tabs>

          <Box sx={{ marginBottom: 4, display: 'flex', alignItems: 'center', flexDirection: 'column'  }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AccountBoxIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {tabLabels[tab]}
            </Typography>
          </Box>

          {(() => {

            // Tutor Registration Form
            if (tab === 0) {

              if (tutorFinished) {

                // Already registered as Peer Tutor
                if (tutorResult?.data && tutorResult?.data.length !== 0 && !tutorRegistered) {
                  return (
                    <>
                      <Typography align="center"> You have already registered as a Peer Tutor! </Typography>
                      <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
                        <Typography align="center"> Click Here to Update Profile </Typography>
                      </Button>
                    </>
                  );

                }
                // Not registered as Peer Tutor Yet
                else {

                  // General Info Tab
                  if (activeStep === 0) {
                    return (
                      <>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <PeerTutorForm formData={peerTutorFormData} setFormData={setPeerTutorFormData} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                        <Button disabled={true} onClick={handleBack}>
                          Back
                        </Button>
                        <Button onClick={handleNext}>Next</Button>
                      </Box>
                      </>
                    );
                  }

                  // Transcript Page
                  else if (activeStep === 1) {
                    return (
                      <>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <TranscriptUpload setTranscript={setTranscript} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                        <Button onClick={handleBack}>
                          Back
                        </Button>
                        <Button onClick={handleNext}>Next</Button>
                      </Box>
                      </>
                    );
                  }

                  // Tutor Card Page
                  else if (activeStep === 2) {
                    return (
                      <>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <TutorCardPage tutor={tutor} />
                      <Button color="secondary" onClick={handleNext}>Register as Peer Tutor!</Button> 
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                        <Button onClick={handleBack}>
                          Back
                        </Button>
                        <Button disabled={true} onClick={handleNext}>Next</Button>
                      </Box>
                      </>
                    );
                  }

                  // Course Preferences Page
                  else if (activeStep === 3) {
                    if (tutorRegistered && tutorRefetched) {
                      if (!preferencesSet) {
                        return (
                          <>
                          <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                          <CoursePreferences tutorTimePreferences={tutorTimePreferences} setTutorTimePreferences={setTutorTimePreferences} timePreferences={timePreferences} setTimePreferences={setTimePreferences} locationPreferences={locationPreferences} setLocationPreferences={setLocationPreferences} eligibleCourses={eligibleCourses} checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                            <Button disabled={true} onClick={handleBack}>
                              Back
                            </Button>
                            <Button onClick={handleNext}>Next</Button>
                          </Box>
                          </>
                        );
                      }
                    }
                    else {
                      return (
                        <>
                        <Skeleton animation="wave" variant="rounded" width="100%" height={120}></Skeleton>
                        </>
                      )
                    }
                  }

                  else if (activeStep === 4) {
                    if (preferencesSet) {
                      return (
                      <>
                      <Typography align="center"> Thank you for Registering as a Peer Tutor! </Typography>
                      <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
                        <Typography align="center"> Click Here to See Your Profile! </Typography>
                      </Button>
                      </>
                      );
                    }
                  }
                }
              }
            }
            // Tutee Registtration Form
            else if (tab === 1) {

              if (tuteeFinished) {
                if (tuteeResult && tuteeResult?.length !== 0 && !tuteeRegistered) {
                  return (
                    <>
                      <Typography align="center"> You have already registered as a Tutee! </Typography>
                      <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
                        <Typography align="center"> Click Here to Update Profile </Typography>
                      </Button>
                    </>
                  );
                }
                else if (tuteeResult && tuteeResult?.length === 0 && !tuteeRegistered) {
                  return (
                    <>
                      <TuteeForm tuteeRegistered={tuteeRegistered} setTuteeRegistered={setTuteeRegistered}/>
                    </>
                  )
                }

                else if (tuteeResult && tuteeResult?.length === 0 && tuteeRegistered) {
                  return (
                    <>
                    <Typography align="center"> Thank you for Registering as a Tutee! </Typography>
                    <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
                      <Typography align="center"> Click Here to See Your Profile! </Typography>
                    </Button>
                    </>
                  )
                }
              }
            }


          })()}

        </Box>
      </Paper>
    </Container>
    </>
  );
}