'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card, CardContent, Skeleton, CardMedia, TextField, Grid, Button, Typography, Divider, Avatar, Paper, Link, Tab, Tabs } from '@mui/material';
import { TableFetch, TableUpdate } from '@/app/_lib/data';

import { useSession } from 'next-auth/react';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
const tabLabels = ["Peer Tutor Profile Information", "Tutee Profile Information"];

const mutateData = (email: string) => {
  TableUpdate<void>('tutor', [], `email_old=${email}`, `first_name_new=Corbin`);
};

interface EditableProfileFieldProps {
  label: string;
  value: string | number;
  onSave: (newValue: string | number) => void;
}

function EditableProfileField({ label, value, onSave }: EditableProfileFieldProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  // Update editedValue when value changes
  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    onSave(editedValue);
    setEditMode(false);
  };

  return (
    <>
      <TextField
        label={label}
        value={editedValue}
        onChange={(event) => setEditedValue(event.target.value)}
        InputProps={{
          readOnly: !editMode,
        }}
        fullWidth
        multiline={label === "Bio Text"}
        rows={label === "Bio Text" ? 4 : 1}
      />
      {editMode ? (
        <Button onClick={handleSave}>Save</Button>
      ) : (
        <Button onClick={handleToggleEditMode}>Edit</Button>
      )}
    </>
  );
}

function ProfilePage() {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const [tab, setTab] = React.useState(0);

  const [tutorProfileData, setTutorProfileData] = useState<Tutor>({
    activeStatusName: "active",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    pictureUrl: "",
    listingTitle: "",
    bioText: "",
    averageRating: 0,
    numberOfRatings: 0,
    coursePreferences: [],
    locationPreferences: [],
    majorAbbreviation: "",
    payRate: 0,
    seniorityName: "Senior"
  });

  const { data: tutorData, isLoading: tutorIsLoading, isFetching: tutorIsFetching, refetch: tutorRefetch } = 
    TableFetch<TutorQuery>("tutor", [], `email_contains=${email}`);
    
  const { data: tuteeData, isLoading: tuteeIsLoading, isFetching: tuteeIsFetching, refetch: tuteeRefetch } = 
    TableFetch<TuteeQuery>("tutee", [], `email_contains=${email}`);
    
  //TableUpdate<void>('tutor', [], `email_old=${email}`, `first_name_new=Corbin`);

  useEffect(() => {
    tutorRefetch();
    tuteeRefetch();
  }, [session]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };


  useEffect(() => {
    if (tutorData?.data && (tutorData.data.length > 0)) {
      const tutor = tutorData.data[0];
      setTutorProfileData({
        activeStatusName: tutor.activeStatusName,
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        email: tutor.email,
        phoneNumber: tutor.phoneNumber,
        pictureUrl: tutor.pictureUrl,
        listingTitle: tutor.listingTitle,
        bioText: tutor.bioText,
        averageRating: tutor.averageRating,
        numberOfRatings: tutor.numberOfRatings,
        coursePreferences: tutor.coursePreferences,
        locationPreferences: tutor.locationPreferences,
        majorAbbreviation: tutor.majorAbbreviation,
        payRate: tutor.payRate,
        seniorityName: tutor.seniorityName
      });
    }
  }, [tutorData]);

  const handleInputChange = (field: keyof typeof tutorProfileData) => (newValue: string | number) => {
    setTutorProfileData({ ...tutorProfileData, [field]: newValue });
  };

  return (
    <div style={{ paddingTop: '30px'}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar src={session?.user?.image?.toString()} alt="" style={{ marginRight: '10px' }} />
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
      </div>
      {(tutorIsLoading || tutorIsFetching) && (
        <Skeleton animation="wave" variant="rounded" width="100%"> </Skeleton>
      )}

        <Tabs value={tab} onChange={handleChangeTab} centered>
          <Tab label={tabLabels[0]} />
          <Tab label={tabLabels[1]} />
        </Tabs>

      {(tab === 0 && tutorData?.data?.length && (!tutorIsLoading && !tutorIsFetching)) && (
      <div>

      <Card style={{ width: '80%', margin: 'auto', marginTop: 50, display: 'flex' }}>
        <CardContent style={{ padding: '20px' }}>

          <Typography variant="h6" gutterBottom>
            General Info
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <EditableProfileField
                label="First Name"
                value={tutorProfileData.firstName}
                onSave={handleInputChange('firstName')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Last Name"
                value={tutorProfileData.lastName}
                onSave={handleInputChange('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Phone Number"
                value={tutorProfileData.phoneNumber}
                onSave={handleInputChange('phoneNumber')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Listing Title"
                value={tutorProfileData.listingTitle}
                onSave={handleInputChange('listingTitle')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Major Abbreviation"
                value={tutorProfileData.majorAbbreviation}
                onSave={handleInputChange('majorAbbreviation')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Pay Rate"
                value={tutorProfileData.payRate}
                onSave={handleInputChange('payRate')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Bio Text"
                value={tutorProfileData.bioText}
                onSave={handleInputChange('bioText')}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={() => email && mutateData(email)}>
            Click me!
          </Button>
        </CardContent>
      </Card>
        

      <Card style={{ width: '80%', margin: 'auto', marginTop: 50, display: 'flex' }}>
        <CardContent style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Eligible Courses
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
        </CardContent>
      </Card>
      </div>
      )}
      {(tab === 0 && !tutorData?.data?.length && (!tutorIsLoading && !tutorIsFetching)) && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            We cannot find a Tutor Account with this Email
          </Typography>
          <Typography variant="h4" gutterBottom>
            <Button variant="contained" color="primary" href='/register'>
              Click Here to Register!!
            </Button>
          </Typography>
        </Paper>
      </div>
      )}
      {(tab === 1 && tuteeData?.length && (!tuteeIsLoading && !tuteeIsFetching)) && (
      <div>

      <Card style={{ width: '80%', margin: 'auto', marginTop: 50, display: 'flex' }}>
        <CardContent style={{ padding: '20px' }}>

          <Typography variant="h6" gutterBottom>
            General Info
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <EditableProfileField
                label="First Name"
                value={tutorProfileData.firstName}
                onSave={handleInputChange('firstName')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Last Name"
                value={tutorProfileData.lastName}
                onSave={handleInputChange('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Phone Number"
                value={tutorProfileData.phoneNumber}
                onSave={handleInputChange('phoneNumber')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Listing Title"
                value={tutorProfileData.listingTitle}
                onSave={handleInputChange('listingTitle')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Major Abbreviation"
                value={tutorProfileData.majorAbbreviation}
                onSave={handleInputChange('majorAbbreviation')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Pay Rate"
                value={tutorProfileData.payRate}
                onSave={handleInputChange('payRate')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Bio Text"
                value={tutorProfileData.bioText}
                onSave={handleInputChange('bioText')}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={() => email && mutateData(email)}>
            Click me!
          </Button>

        </CardContent>
      </Card>

      <Card style={{ width: '80%', margin: 'auto', marginTop: 50, display: 'flex' }}>
        <CardContent style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Eligible Courses
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
        </CardContent>
      </Card>
      </div>
      
      )}
      {(tab === 1 && !tuteeData?.length && (!tuteeIsLoading && !tuteeIsFetching)) && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            We cannot find a Tutee Account with this Email
          </Typography>
          <Typography variant="h4" gutterBottom>
            <Button variant="contained" color="primary" href='/register'>
              Click Here to Register!!
            </Button>
          </Typography>
        </Paper>
      </div>
      )}

        
    </div>
  );
}

export default ProfilePage;
