'use client';

import * as React from 'react';
import { useState } from 'react';

import { 
  Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, InputLabel, MenuItem, Select, SelectChangeEvent,
  OutlinedInput, InputAdornment
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { CreateTutor } from '@/app/_lib/data';
import { AnyARecord } from 'dns';

import { useSession, signOut } from 'next-auth/react';

export default function SignUp() {

  // Seniority Selection -------------------------------------------------
  const seniorityOptions = [
    { value: '1', label: 'Freshman' },
    { value: '2', label: 'Sophomore' },
    { value: '3', label: 'Junior' },
    { value: '4', label: 'Senior' },
    { value: '5', label: 'Graduate Student' }
  ];
  
  const [seniority, setSeniority] = React.useState('');
  
  const changeSeniority = (event: SelectChangeEvent) => {
    setSeniority(event.target.value as string);
  };

  // Google Account Specific Info ----------------------------------------

  const { data: session, status } = useSession();

  // Submission of the peer tutor form -----------------------------------
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const registrationData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      uin: formData.get('uin') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      title: formData.get('title') as string,
      seniority: seniority,
      payRate: formData.get('payrate') as string,
      bioText: "HELLO",
      email: session?.user?.email as string,
      pfp: session?.user?.image as string
    };

    CreateTutor(registrationData);
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
                  name="uin"
                  label="UIN"
                  type="uin"
                  id="uin"
                  autoComplete="UIN"
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