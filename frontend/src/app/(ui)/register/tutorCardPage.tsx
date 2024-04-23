import * as React from 'react';

import { Typography, Grid, Box }
  from '@mui/material';

import { TutorCard } 
  from '../tutor-card';

/**
 * Component for displaying Tutor Card during registration
 * @param data - Tutor Information 
 * @returns 
 */
export function TutorCardPage(
  {data}
  :
  {data: Tutor}
) {

  return (
    <Grid container rowSpacing={3}>
    <Grid item xs={12}> <Typography align="center"> Here is your Tutor Card!! </Typography> </Grid>
    <Grid item xs={12}> <TutorCard tutor={data} /> </Grid>
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