import * as React from 'react';

import { Grid, TextField }
    from '@mui/material';

export default function TuteeInformation(props: any) {

  const { data } = props;

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
        <Grid item xs={6}>
        <TextField
          label="Phone Number"
          value={data.phoneNumber}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="Major"
          value={data.majorAbbreviation}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        </Grid>
      </Grid>
    </>
  );
}