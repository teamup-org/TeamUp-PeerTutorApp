import * as React from 'react';

import { Grid, TextField }
    from '@mui/material';

export default function TutorInformation(props: any) {

    const { data } = props;

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
                label="First Name"
                value={data.firstName}
                InputProps={{
                    readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Last Name"
                value={data.lastName}
                InputProps={{
                    readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Phone Number"
                value={data.phoneNumber}
                InputProps={{
                    readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Major"
                value={data.majorAbbreviation}
                InputProps={{
                    readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Pay Rate"
                value={data.payRate}
                InputProps={{
                    readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Listing Title"
                value={data.listingTitle}
                InputProps={{
                    readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Bio Text"
                value={data.bioText}
                InputProps={{
                    readOnly: true,
                }}
                multiline
                rows={4}
            />
            </Grid>
        </Grid>
        </>
    );
}