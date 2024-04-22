import * as React from 'react';

import { Grid, TextField }
  from '@mui/material';

/**
 * Component for displaying Tutor General Information on Profile Page that cannot be edited
 * @param props 
 * @returns 
 */
export function TutorInformation(
  {data}
  :
  {data: Tutor}) 
  {

  return (
  <>
    <Grid container spacing={2}>
    <Grid item xs={6} md={6}>
    <TextField
      label="First Name"
      value={data.firstName}
      InputProps={{
      readOnly: true,
      }}
      fullWidth
    />
    </Grid>
    <Grid item xs={6} md={6}>
    <TextField
      label="Last Name"
      value={data.lastName}
      InputProps={{
      readOnly: true,
      }}
      fullWidth
    />
    </Grid>
    <Grid item xs={4}>
    <TextField
      label="Phone Number"
      value={data.phoneNumber}
      InputProps={{
      readOnly: true,
      }}
      fullWidth
    />
    </Grid>
    <Grid item xs={4}>
    <TextField
      label="Major"
      value={data.majorAbbreviation}
      InputProps={{
      readOnly: true,
      }}
      fullWidth
    />
    </Grid>
    <Grid item xs={4}>
    <TextField
      label="Pay Rate"
      value={data.payRate}
      InputProps={{
      readOnly: true,
      }}
      fullWidth
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
      label="Listing Title"
      value={data.listingTitle}
      InputProps={{
      readOnly: true,
      }}
      fullWidth
    />
    </Grid>
    <Grid item xs={12} sm={12}>
    <TextField
      label="Bio Text"
      value={data.bioText}
      InputProps={{
      readOnly: true,
      }}
      multiline
      rows={4}
      fullWidth
    />
    </Grid>
    </Grid>
  </>
  );
}