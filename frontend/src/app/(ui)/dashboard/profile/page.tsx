'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card, CardContent, Skeleton, CardMedia, TextField, Grid, Button, Typography, Divider, Avatar, Paper, Link } from '@mui/material';
import { TableFetch } from '@/app/_lib/data';

import { useSession } from 'next-auth/react';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

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

  const [profileData, setProfileData] = useState<Tutor>({
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

    useEffect(() => {
      tutorRefetch();
    }, [email]);


  useEffect(() => {
    if (tutorData?.data && (tutorData.data.length > 0)) {
      const tutor = tutorData.data[0];
      setProfileData({
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

  const handleInputChange = (field: keyof typeof profileData) => (newValue: string | number) => {
    setProfileData({ ...profileData, [field]: newValue });
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
      {(tutorData?.data?.length && (!tutorIsLoading && !tutorIsFetching)) ? (
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
                value={profileData.firstName}
                onSave={handleInputChange('firstName')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Last Name"
                value={profileData.lastName}
                onSave={handleInputChange('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Phone Number"
                value={profileData.phoneNumber}
                onSave={handleInputChange('phoneNumber')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Listing Title"
                value={profileData.listingTitle}
                onSave={handleInputChange('listingTitle')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Major Abbreviation"
                value={profileData.majorAbbreviation}
                onSave={handleInputChange('majorAbbreviation')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Pay Rate"
                value={profileData.payRate}
                onSave={handleInputChange('payRate')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Bio Text"
                value={profileData.bioText}
                onSave={handleInputChange('bioText')}
              />
            </Grid>
          </Grid>
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
      ) : (
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
      )
    }
    </div>
  );
}

export default ProfilePage;
