'use client';

import * as React from 'react';
import { useState } from 'react';

import { 
  Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, InputLabel, MenuItem, Select, SelectChangeEvent,
  OutlinedInput, InputAdornment
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { TableFetch } from '@/app/_lib/data';
import { AnyARecord } from 'dns';

export default function SignUp() {

  const {data, isLoading, isError} = TableFetch("course");
  const [courseOption, setCourseOption] = useState<{title: string, major: string, number: number} | null>(null);

  const getCourses = () => {
    return data?.map((course: any) => (
      { 
        title: course.courseTitle,
        major: course.majorAbbreviation,
        number: course.courseNumber,
      }
    ));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [seniority, setSeniority] = React.useState('');

  const changeSeniority = (event: SelectChangeEvent) => {
    setSeniority(event.target.value as string);
  };

  const changeCourse = (event: SelectChangeEvent) => {
    const selectedIndex = event.target.value as string;
    if (selectedIndex) {
      const index = parseInt(selectedIndex);
      setCourseOption(data[index]);
    } else {
      setCourseOption(null);
    }
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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

              <Grid item xs={12} sm={6}>
              <InputLabel id="senioritySelect">Seniority</InputLabel>
              <Select
                labelId="seniorityLabel"
                id="seniority"
                value={seniority}
                label="seniority"
                onChange={changeSeniority}
              >
                <MenuItem value={1}>Freshman</MenuItem>
                <MenuItem value={2}>Sophomore</MenuItem>
                <MenuItem value={3}>Junior</MenuItem>
                <MenuItem value={4}>Senior</MenuItem>
                <MenuItem value={5}>Graduate Student</MenuItem>
              </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="payrate">Pay Rate/Hr</InputLabel>
              <OutlinedInput
                id="payrate"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="payrate"
              />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              component={Link}
              href="/dashboard"
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