'use client';

import * as React from 'react';
import { useState } from 'react';

import { 
  Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, InputLabel, MenuItem, Select, SelectChangeEvent,
  OutlinedInput, InputAdornment
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useTutorMutation } from '@/app/_lib/data';
import { AnyARecord } from 'dns';

import { useSession, signOut } from 'next-auth/react';

const newTutor = { 
  active_status_name: "active",
  //first_name: fields.firstName,
  first_name: "Trey",
  //last_name: fields.lastName,
  last_name: "Wells",
  listing_title: "csce tutor",
  //seniority_name: fields.seniority,
  seniority_name: "senior",
  //major_abbreviation: fields.major,
  major_abbreviation: "csce",
  pay_rate: 40.0,
  //bio_text: fields.bioText,
  bio_text: "Howdy everybody!",
  //picture_url: fields.pfp,
  picture_url: "fakeline",
  //phone_number: fields.phoneNumber,
  phone_number: 2146017139,
  //email: fields.email,
  email: "wells.t.2024@tamu.edu"
  //active_status_name: 1
};

export default function SignUp() {

  // Seniority Selection -------------------------------------------------
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

  // Submission of the peer tutor form -----------------------------------

  const { mutate } = useTutorMutation();
  
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register as a Peer Tutor
          </Typography>
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
                  label="Phone Number"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/dashboard/profile" variant="body2">
                  Already Registered? Update Profile
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}