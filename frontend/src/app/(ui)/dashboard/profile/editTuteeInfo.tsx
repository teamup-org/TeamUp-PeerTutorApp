import * as React from 'react'

import { TextField, Grid, Autocomplete } 
  from '@mui/material';

import { TableFetch }
  from '@/app/_lib/data';

/**
 * Component for showing Tutee data that can be edited
 * @param props 
 * @returns Element displaying editable fields for Tutee Infomation to be used in Profile Page
 */  
export function EditTuteeInfo(
  {data, setData}
  :
  {data: Tutee, setData: Function}) 
  {

  // Database Fetching for majors
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

  const handleInputChange = (field: string, newValue: string | number) => {
    setData({ ...data, [field]: newValue });
  };

  const handleMajorChange = (event: any, value: string | null) => {
    setData({...data, majorAbbreviation: value});
  };

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={6}>
      <TextField
        label="First Name"
        value={data.firstName}
        onChange={(e) => {handleInputChange('firstName', e.target.value)}}
        fullWidth
      />
      </Grid>
      <Grid item xs={6}>
      <TextField
        label="Last Name"
        value={data.lastName}
        onChange={(e) => {handleInputChange('lastName', e.target.value)}}
        fullWidth
      />
      </Grid>
      <Grid item xs={6}>
      <TextField
        label="Phone Number"
        value={data.phoneNumber}
        onChange={(e) => {handleInputChange('phoneNumber', e.target.value)}}
        fullWidth
      />
      </Grid>
      <Grid item xs={6}>
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
    </Grid>
    </>
  );

}