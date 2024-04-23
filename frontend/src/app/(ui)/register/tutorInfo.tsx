import * as React from 'react';

import {Box, Grid, TextField, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment, Autocomplete, SelectChangeEvent} 
  from "@mui/material"

import { TableFetch } 
  from '@/app/_lib/data';

/**
 * Component for first step of Tutor Registration, General Information Input Form
 * @param {Tutor} data - Stores all registration information for Tutor
 * @returns 
 */
export function TutorInformation(
  {data: [data, setData]}
  :
  {data: [Tutor, Function]}
) {

  // Fetch all majors from database
  const { data: majorData, isLoading: majorIsLoading } = 
    TableFetch<Major[]>("major", []);

  const populateMajorOptions = () => {
    if (majorData) 
      return (
        majorData.map( 
          (major: Major) => (major.majorAbbreviation.toUpperCase()) 
        )
      ).sort( 
        (a, b) => (-b.localeCompare(a)) 
      );

    return [];
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const seniorityOptions = [
    { value: 'Freshman', label: 'Freshman' },
    { value: 'Sophomore', label: 'Sophomore' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Graduate', label: 'Graduate Student' }
  ];
  
  const handleSeniorityChange = (event: SelectChangeEvent) => {
    setData((prevData: any) => ({ ...prevData, ['seniorityName']: event.target.value as Seniority}));
  };

  const handleMajorChange = (event: any, value: string | null) => {
    setData((prevData: any) => ({ ...prevData, ['majorAbbreviation']: value }));
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
            value={data.firstName}
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
            value={data.lastName}
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
            value={(data.phoneNumber === 0) ? '' : data.phoneNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="title"
            label="Title (Ex. Computer Science Tutor)"
            name="listingTitle"
            autoComplete="title"
            value={data.listingTitle}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputLabel id="senioritySelect">Seniority</InputLabel>
        <Select
          labelId="seniorityLabel"
          id="seniorityName"
          value={data.seniorityName}
          label="seniority"
          onChange={handleSeniorityChange}
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
            value={data.payRate}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete 
              fullWidth loading={majorIsLoading}
              id="autocomplete-major" 
              options={populateMajorOptions()} 
              isOptionEqualToValue={ (option, value) => (option === value) }
              groupBy={ (option) => option[0] }
              value={data.majorAbbreviation || null} onChange={handleMajorChange} 
              renderInput={ (params) => <TextField {...params} label="Major" /> } 
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
            multiline  
            rows={4}  
            value={data.bioText}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </Box>
  );
}