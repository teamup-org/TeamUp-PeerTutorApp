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

import { 
  Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, InputLabel, MenuItem, Select, SelectChangeEvent,
  OutlinedInput, InputAdornment, Tabs, Tab, Step, Stepper, StepLabel, StepContent
} from '@mui/material';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useTutorCreate, useTutorEligibleCourse, useTuteeMutation, useTutorCoursePreference } from '@/app/_lib/data';
import { AnyARecord } from 'dns';

import { useSession } from 'next-auth/react';
import { all } from 'axios';

const steps = ['General Info', 'Transcript', 'Finalize'];

interface RowData {
  courseType: string;
  courseNumber: string;
  courseGrade: string;
}

interface Tutor {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  payRate: number;
  averageRating: number;
  numberOfRatings: number;
  listingTitle: string;
  bioText: string;
  coursePreferences: {id: number, majorAbbreviation: string, courseNumber: number}[];
}

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

function PeerTutorForm() {

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

  // Google Account Specific Info ----------------------------------------

  const { data: session, status } = useSession();

  // Form submission -----------------------------------------------------

  const { mutate } = useTutorCreate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const registrationData = {
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      phone_number: formData.get('phoneNumber') as string,
      listing_title: formData.get('title') as string,
      seniority_name: seniority,
      pay_rate: formData.get('payrate') as string,
      bio_text: formData.get('bioText') as string,
      email: session?.user?.email as string,
      picture_url: session?.user?.image as string,
      major_abbreviation: formData.get('major') as string,
      active_status_name: 'active'
    };
    
    mutate(registrationData);
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

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="title"
            label="Title (Ex. Computer Science Tutor)"
            name="title"
            autoComplete="title"
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
            name="payrate"
            id="payrate"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="payrate"
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

function TuteeForm() {

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
    setInputs([...inputs, { courseType: '', courseNumber: '', courseGrade: '' }]);
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

  const [activeStep, setActiveStep] = React.useState(0);

  const [inputs, setInputs] = useState([{ courseType: '', courseNumber: '', courseGrade: '' }]);

  const updateInputs = (newInputs: any) => {
    setInputs(newInputs);
  };

  // Google Account Specific Info ----------------------------------------

  const { data: session, status } = useSession();

  var t1 = {
    firstName: "Trey",
    lastName: "Wells",
    pictureUrl: session?.user?.image,
    payRate: 30.0,
    averageRating: 5,
    numberOfRatings: 40,
    listingTitle: "tutor",
    bioText: "am happy, very happy",
    coursePreferences: [{id: 0, majorAbbreviation: "csce", courseNumber: 120}]
  }

  const [tutor, setTutor] = React.useState<Tutor>({
    firstName: '',
    lastName: '',
    pictureUrl: '',
    payRate: 0,
    averageRating: 5,
    numberOfRatings: 0,
    listingTitle: '',
    bioText: '',
    coursePreferences: []
  });

  const handleNext = () => {

    
    if (tab == 0) {

      let allFieldsFilled = true;

      if (activeStep === 0) {

        const fname = document.getElementById('firstName') as HTMLInputElement;
        const lname = document.getElementById('lastName') as HTMLInputElement;
        const phone = document.getElementById('phoneNumber') as HTMLInputElement;
        const title = document.getElementById('title') as HTMLInputElement;
        const payrate = document.getElementById('payrate') as HTMLInputElement;
        const major = document.getElementById('major') as HTMLInputElement;
        const bio = document.getElementById('bioText') as HTMLInputElement;

        if (!fname?.value || !lname?.value || !phone?.value || !title?.value || !selected || !payrate?.value || !major?.value || !bio?.value) {
          allFieldsFilled = false;
        }

        if (allFieldsFilled) {
          setPeerTutorData((prevData) => ({
            ...prevData,
            firstName: fname?.value,
            lastName: lname?.value,
            phoneNumber: Number(phone?.value),
            title: title?.value,
            seniority: selected,
            payrate: Number(payrate?.value),
            major: major?.value,
            bioText: bio?.value
          }));
        }
        else {
          alert("Fill out all fields first before continuing");
          return;
        }
      }
      else if (activeStep === 1) {

        for (var i = 0; i < inputs.length; i++) {
          if (!(inputs[i].courseType) || !(inputs[i].courseNumber) || !(inputs[i].courseGrade)) {
            allFieldsFilled = false;
          }
        }


        const newTutor: Tutor = {
          firstName: peerTutorData.firstName,
          lastName: peerTutorData.lastName,
          bioText: peerTutorData.bioText,
          listingTitle: peerTutorData.title,
          payRate: peerTutorData.payrate,
          pictureUrl: session?.user?.image || '',
          coursePreferences: inputs.map((input, index) => ({
            id: index,
            majorAbbreviation: input.courseType,
            courseNumber: Number(input.courseNumber)
          })),
          averageRating: 5,
          numberOfRatings: 0 
        };

        setTutor(newTutor);

        console.log(tutor);

        if (allFieldsFilled) {
          setCoursesData(inputs);
        }
        else {
          alert("Fill out all fields first before continuing");
          return;
        }

      }
      else if (activeStep === 2) {
        console.log(peerTutorData);
        console.log(coursesData);

      }
    }

    console.log(tutor);

    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [tab, setTab] = React.useState(0);

  const [peerTutorData, setPeerTutorData] = React.useState<PeerTutorData>({
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    title: '',
    seniority: '',
    payrate: 0,
    major: '',
    bioText: ''
  });

  const [tuteeData, setTuteeData] = React.useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    seniority: '',
    major: ''
  });

  const [coursesData, setCoursesData] = React.useState([{ courseType: '', courseNumber: '', courseGrade: '' }]);

  const tabLabels = ["Register as Peer Tutor", "Register as Tutee"];

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
    <header>
      <ResponsiveAppBar position="static" display={{ xs: 'none', md: 'flex' }} links={links} />
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

          {tab === 0 && (
            <>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === 0 && <PeerTutorForm />}
              {activeStep === 1 && <DynamicTextFieldForm inputs={inputs} updateInputs={updateInputs} setInputs={setInputs} />}
              {activeStep === 2 && <TutorCard tutor={tutor} />}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </Box>
            </>
          )}
          {tab === 1 && <TuteeForm />}

        </Box>
      </Paper>
    </Container>
    </>
  );
}