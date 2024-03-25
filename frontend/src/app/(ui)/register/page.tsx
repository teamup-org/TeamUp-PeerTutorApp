'use client';

import * as React from 'react';
import { useState } from 'react';

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
  OutlinedInput, InputAdornment, Tabs, Tab, Step, Stepper, StepLabel, StepContent
} from '@mui/material';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useTuteeMutation, TableFetch } from '@/app/_lib/data';

import { useSession } from 'next-auth/react';


import axios from 'axios';
const development = "http://localhost:8080";
const deployment = "https://tamutheo.xyz/database_api";
axios.defaults.baseURL = development;

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');
}

const steps = ['General Info', 'Transcript', 'Finalize'];

interface RowData {
  courseType: string;
  courseNumber: string;
  courseGrade: string;
}

/*interface Tutor {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  payRate: number;
  averageRating: number;
  numberOfRatings: number;
  listingTitle: string;
  bioText: string;
  phoneNumber: number;
  email: string;
  majorAbbreviation: string;
  seniority: string;
  coursePreferences: {id: number, majorAbbreviation: string, courseNumber: number}[];
}*/

interface PeerTutorData {
  firstName: string;
  lastName: string;
  phoneNumber: number; // Allow both string and number types
  title: string;
  seniority: string;
  payrate: number; // Allow both string and number types
  major: string;
  bioText: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

var selected: string;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {index === 0 && <PeerTutorForm />}
          {index === 1 && <TuteeForm />}
        </Box>
      )}
    </div>
  );
}

function PeerTutorForm(props: any) {

  const { formData, setFormData } = props;  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const seniorityOptions = [
    { value: 'freshman', label: 'Freshman' },
    { value: 'sophomore', label: 'Sophomore' },
    { value: 'junior', label: 'Junior' },
    { value: 'senior', label: 'Senior' },
    { value: 'graduate', label: 'Graduate Student' }
  ];
  
  const [seniority, setSeniority] = React.useState('');
  
  const changeSeniority = (event: SelectChangeEvent) => {
    setSeniority(event.target.value as string);
    selected = event.target.value;
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
          value={seniority}
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

function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



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

  const { tuteeIsRegistered, setTuteeIsRegistered } = props;
  
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
      major_abbreviation: formData.get('major') as string
    };
    
    mutate(registrationData);

    setTuteeIsRegistered(true);

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

function DynamicTextFieldForm(props: any) {
  const { inputs, updateInputs, setInputs } = props;

  const addRow = () => {
    setInputs([...inputs, { majorAbbreviation: '', courseNumber: 0, courseGrade: '', tutorEmail: '' }]);
  };

  const handleFieldChange = (index: any, event: any) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], [event.target.name]: event.target.value };
    updateInputs(newInputs);
  };

  return (
    <div>
      {inputs.map((input: any, index: any) => (
        <div key={index} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <TextField
            label="Course Type"
            variant="outlined"
            fullWidth
            margin="normal"
            name="courseType"
            value={input.courseType}
            onChange={(event) => handleFieldChange(index, event)}
          />
          <TextField
            label="Course Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="courseNumber"
            value={input.courseNumber}
            onChange={(event) => handleFieldChange(index, event)}
          />
          <TextField
            label="Grade"
            variant="outlined"
            fullWidth
            margin="normal"
            name="courseGrade"
            value={input.courseGrade}
            onChange={(event) => handleFieldChange(index, event)}
          />
        </div>
      ))}
      
      <Button variant="contained" color="primary" onClick={addRow}>
        Add Row
      </Button>

    </div>
  );
}

export default function Registration() {

  // Variable Initializing ------------------------------------------------------------------------

  const [tutorRegistered, setTutorRegistered] = useState(false);   // This will be set to true when registration is submitted
  const [tuteeRegistered, setTuteeRegistered] = useState(false);   // This will be set to true when registration is submitted

  const { data: session, status } = useSession();

  const [activeStep, setActiveStep] = React.useState(0);
  
  const [tab, setTab] = React.useState(0);
  
  const [inputs, setInputs] = useState<Tutor["coursePreferences"]>([{ majorAbbreviation: '', courseNumber: 0, courseGrade: '', tutorEmail: '' }]);

  const [peerTutorFormData, setPeerTutorFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    title: '',
    payRate: '',
    major: '',
    bioText: '',
  });

  const [tutor, setTutor] = React.useState<Tutor>({
    activeStatusName: "active",
    locationPreferences: [ { locationName: '', tutorEmail: '' } ],
    firstName: '',
    lastName: '',
    pictureUrl: '',
    payRate: 0,
    averageRating: 5,
    numberOfRatings: 0,
    listingTitle: '',
    bioText: '',
    phoneNumber: -1,
    email: '',
    majorAbbreviation: '',
    seniorityName: 'Freshman',
    coursePreferences: []
  });

  // Button and Update Functions -------------------------------------------------------------

  const updateInputs = (newInputs: any) => {
    setInputs(newInputs);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  
  const handleTutor = () => {
    TutorCreation();
    setTutorRegistered(true);
  }

  const handleNext = () => {
  
    if (tab == 0) {
  
      if (activeStep === 0) {
  
        for (const key in peerTutorFormData) {
          if (!(peerTutorFormData as any)[key] || !selected) {
            alert("Fill out all fields first before continuing");
            return;
          }
        }
      }
      else if (activeStep === 1) {
  
        for (var i = 0; i < inputs.length; i++) {
          if (!(inputs[i].majorAbbreviation) || !(inputs[i].courseNumber) || !(inputs[i].courseGrade)) {
            alert("Fill out all fields first before continuing");
            return;
          }
        }
  
        const newTutor: Tutor = {
          activeStatusName: 'active',
          locationPreferences: [ { locationName: '', tutorEmail: '' } ],
          firstName: peerTutorFormData.firstName,
          lastName: peerTutorFormData.lastName,
          bioText: peerTutorFormData.bioText,
          listingTitle: peerTutorFormData.title,
          payRate: Number(peerTutorFormData.payRate),
          pictureUrl: session?.user?.image || '',
          phoneNumber: Number(peerTutorFormData.phoneNumber),
          email: session?.user?.email || '',
          majorAbbreviation: peerTutorFormData.major,
          seniorityName: selected as Seniority,
          coursePreferences: inputs.map((input, index) => ({
            tutorEmail: input.tutorEmail,
            majorAbbreviation: input.majorAbbreviation,
            courseGrade: input.courseGrade,
            courseNumber: input.courseNumber
          })),
          averageRating: 5,
          numberOfRatings: 0 
        };
  
        setTutor(newTutor);
  
      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Checks to see if account is already registered --------------------------------------------------------------

  const {data: tutorResult} = TableFetch<TutorQuery>("tutor", [], `email_contains=${session?.user?.email}`);
  const {data: tuteeResult} = TableFetch<TuteeQuery>("tutee", [], `email_contains=${session?.user?.email}`);

  // Operations for database insertions ---------------------------------------------------------------------------

  function delay(t: number) {
    return new Promise(resolve => setTimeout(resolve, t));
  }

  async function TutorCreation() {

    const requests = [];
    const results = [];

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
      seniority_name: tutor.seniorityName
    }

    requests.push('/tutor?' + objectToQueryString(tutorCreateData));

    // Update the course eligibility and preferences for the tutor ----------

    for (var i = 0; i < inputs.length; i++) {
      const course = {
        course_grade: inputs[i].courseGrade,
        course_number: inputs[i].courseNumber,
        major_abbreviation: inputs[i].majorAbbreviation,
        tutor_email: session?.user?.email
      }

      requests.push('/tutor_eligible_course?' + objectToQueryString(course));
      requests.push('/tutor_course_preference?' + objectToQueryString(course));
    }

    for (let  request  of  requests) {
      await delay(1000);
      console.log("running request");
      let data = await axios.post(request);
      results.push(data);
    }
  }

  return (
    <>
    <header>
      <ResponsiveAppBar links={links} settings={[]} />
    </header>
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={4}>
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

          {tab === 0 && (tutorResult?.data.length === 0) && !(tutorRegistered) && (
            <>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === 0 && <PeerTutorForm formData={peerTutorFormData} setFormData={setPeerTutorFormData} />}
              {activeStep === 1 && <DynamicTextFieldForm inputs={inputs} updateInputs={updateInputs} setInputs={setInputs} />}
              {activeStep === 2 && (
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}> <Typography align="center"> Here is your Tutor Card!! </Typography> </Grid>
                  <Grid item xs={12}> <TutorCard tutor={tutor} /> </Grid>
                  <Grid item xs={12}> 
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button color="secondary" onClick={handleTutor}>Register as Peer Tutor!</Button> 
                    </Box>
                  </Grid>
                </Grid>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button disabled={activeStep === 2} onClick={handleNext}>Next</Button>
              </Box>
            </>
          )}
          {tab === 0 && (tutorResult?.data.length === 0) && tutorRegistered && (
            <>
            <Typography align="center"> Thank you for Registering as a Peer Tutor! </Typography>
            <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
              <Typography align="center"> Click Here to See Your Profile! </Typography>
            </Button>
          </>
          )}
          {tab === 0 && (tutorResult?.data.length !== 0) && (
            <>
              <Typography align="center"> You have already registered as a Peer Tutor! </Typography>
              <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
                <Typography align="center"> Click Here to Update Profile </Typography>
              </Button>
            </>
          )}
          {tab === 1  && (tuteeResult?.data.length === 0) && !tuteeRegistered && (
            <TuteeForm tuteeIsRegistered={tuteeRegistered} setTuteeIsRegistered={setTuteeRegistered}/>)
          }
          {tab === 1  && (tuteeResult?.data.length === 0) && tuteeRegistered && (
            <>
            <Typography align="center"> Thank you for Registering as a Tutee! </Typography>
            <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
              <Typography align="center"> Click Here to See Your Profile! </Typography>
            </Button>
          </>
          )}
          {tab === 1  && (tuteeResult?.data.length !== 0) && (
            <>
              <Typography align="center"> You have already registered as a Tutee! </Typography>
              <Button key={'hello'} component={Link} href={'/dashboard/profile'} fullWidth sx={{ p: 3 }}> 
                <Typography align="center"> Click Here to Update Profile </Typography>
              </Button>
            </>
          )}

        </Box>
      </Paper>
    </Container>
    </>
  );
}