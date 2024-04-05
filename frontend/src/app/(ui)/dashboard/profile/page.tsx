'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card, CardContent, Skeleton, CardMedia, TextField, Grid, Button, Typography, Divider, Avatar, Paper, Link, Tab, Tabs,
         Alert, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Checkbox } from '@mui/material';
import { TableFetch, TablePush } from '@/app/_lib/data';

import { useSession } from 'next-auth/react';
const tabLabels = ["Peer Tutor Profile Information", "Tutee Profile Information"];

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

function TuteeUpdatePage(props: any) {
  const { tuteeProfileData, setTuteeProfileData, setTuteeUpdate } = props;

  const handleInputChange = (field: keyof typeof tuteeProfileData) => (newValue: string | number) => {
    setTuteeProfileData({ ...tuteeProfileData, [field]: newValue });
  };

  const handleGeneralUpdate = () => {
    setTuteeUpdate(true);
  };

  return (
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
                value={tuteeProfileData.firstName}
                onSave={handleInputChange('firstName')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Last Name"
                value={tuteeProfileData.lastName}
                onSave={handleInputChange('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <EditableProfileField
                label="Phone Number"
                value={tuteeProfileData.phoneNumber}
                onSave={handleInputChange('phoneNumber')}
              />
            </Grid>
            <Grid item xs={6}>
              <EditableProfileField
                label="Major Abbreviation"
                value={tuteeProfileData.majorAbbreviation}
                onSave={handleInputChange('majorAbbreviation')}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleGeneralUpdate}>
            Update My General Information!
          </Button>
        </CardContent>
      </Card>
        
    </div>


);

}

function EligibleCoursesTable(props: any) {

  const {eligibleCourses, coursePreferences} = props

  const coursePreferencesSet = new Set(coursePreferences.map((course: any) => `${course.majorAbbreviation} ${course.courseNumber}`));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Access the first file in the files array
      const file = files[0];
      console.log(file);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div >
        <TableContainer sx={{ maxHeight: '75vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Preferred</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eligibleCourses.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{`${item.majorAbbreviation} ${item.courseNumber}`}</TableCell>
                  <TableCell>{item.courseGrade}</TableCell>
                  <TableCell>
                  <Checkbox
                    checked={coursePreferences.some((c: any) => `${c.majorAbbreviation} ${c.courseNumber}` === `${item.majorAbbreviation} ${item.courseNumber}`)}
                    onChange={(event) => console.log('hi')}
                  />
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginBottom: '5vh', marginTop: '5vh' }}>
          <form id="uploadForm">
            <div>
              <label>Upload your most current transcript: </label>
              <input type="file" accept=".pdf" onChange={handleFileChange} required/>
            </div>
          </form>
        </div>

        <Button variant="contained" color="primary">
            Update My Eligible Courses!
          </Button>
        </div>
  );

}

function TutorUpdatePage(props: any) {
  const { tutorProfileData, setTutorProfileData, setTutorUpdate } = props;

  const handleInputChange = (field: keyof typeof tutorProfileData) => (newValue: string | number) => {
    setTutorProfileData({ ...tutorProfileData, [field]: newValue });
  };

  const handleGeneralUpdate = () => {
    setTutorUpdate(true);
  };

  return (
    <div>
      <Card style={{ width: '80%', margin: 'auto', marginTop: 50, display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ padding: '20px', flexGrow: 1 }}>

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
          <Button variant="contained" color="primary" onClick={handleGeneralUpdate}>
            Update My General Information!
          </Button>
        </CardContent>

        <CardContent style={{ padding: '20px', flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Here are your current eligible courses!
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <EligibleCoursesTable eligibleCourses={tutorProfileData?.eligibleCourses} coursePreferences={tutorProfileData?.coursePreferences} />
        </CardContent>

      </Card>
    </div>


  );

}


function ProfilePage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = React.useState(0);
  const [tutorUpdate, setTutorUpdate] = useState(false);
  const [tuteeUpdate, setTuteeUpdate] = useState(false);

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
    eligibleCourses: [],
    locationPreferences: [],
    majorAbbreviation: "",
    payRate: 0,
    seniorityName: "Senior"
  });

  const [tuteeProfileData, setTuteeProfileData] = useState<Tutee>({
    activeStatusName: "active",
    email: "",
    firstName: "",
    lastName: "",
    majorAbbreviation: "",
    phoneNumber: 0,
    seniorityName: "Senior"
  });

  const { data: tutorData, isLoading: tutorIsLoading, isFetching: tutorIsFetching, isSuccess: tutorIsSuccess, refetch: tutorRefetch } = 
    TableFetch<TutorQuery>("tutor", [], `email_contains=${session?.user?.email}`);
    
  const { data: tuteeData, isLoading: tuteeIsLoading, isFetching: tuteeIsFetching, isSuccess: tuteeIsSuccess, refetch: tuteeRefetch } = 
    TableFetch<TuteeQuery>("tutee", [], `email_contains=${session?.user?.email}`);
    
  const tutorMutationUpdate = TablePush("/tutor/update");
  const tuteeMutationUpdate = TablePush("/tutee/update");

  useEffect(() => {
    tutorRefetch();
    tuteeRefetch();
  }, [session, status]);

  useEffect(() => {

    if (tutorUpdate) {
      updateTutorInformation();
    }

  },[tutorUpdate]);

  useEffect(() => {

    if (tuteeUpdate) {
      updateTuteeInformation();
    }

  },[tuteeUpdate]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };


  useEffect(() => {
    console.log(tutorData?.data?.at(0)?.eligibleCourses);
    if (tutorData?.data && (tutorData.data.length > 0)) {
      setTutorProfileData(tutorData?.data[0]);

    }
  }, [tutorData]);

  useEffect(() => {
    if (tuteeData && (tuteeData.length > 0)) {
      setTuteeProfileData(tuteeData[0]);

    }
  }, [tuteeData]);

  const updateTutorInformation = () => {

    const newTutorInformation = {
      email_old: tutorProfileData.email,
      bio_text_new: tutorProfileData.bioText,
      first_name_new: tutorProfileData.firstName,
      last_name_new: tutorProfileData.lastName,
      listing_title_new: tutorProfileData.listingTitle,
      major_abbreviation_new: tutorProfileData.majorAbbreviation,
      pay_rate_new: tutorProfileData.payRate,
      phone_number_new: tutorProfileData.phoneNumber
    }

    tutorMutationUpdate.mutate(newTutorInformation);
    setTutorUpdate(false);
  };

  const updateTuteeInformation = () => {

    const newTuteeInformation = {
      email_old: tuteeProfileData.email,
      active_status_name_new: tuteeProfileData.activeStatusName,
      first_name_new: tuteeProfileData.firstName,
      last_name_new: tuteeProfileData.lastName,
      major_abbreviation_new: tuteeProfileData.majorAbbreviation,
      phone_number_new: tuteeProfileData.phoneNumber,
      seniority_name_new: tuteeProfileData.seniorityName
    }

    tuteeMutationUpdate.mutate(newTuteeInformation);
    setTuteeUpdate(false);
  };

  return (
    <div style={{ paddingTop: '30px'}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar src={session?.user?.image?.toString()} alt="" style={{ marginRight: '10px' }} />
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
      </div>
        <Tabs value={tab} onChange={handleChangeTab} centered>
          <Tab label={tabLabels[0]} />
          <Tab label={tabLabels[1]} />
        </Tabs>


      {(() => {

        // Tutor Update Page
        if (tab === 0) {

          // Initial Fetch Complete
          if (tutorIsSuccess) {

            // If tutor exists
            if (tutorData?.data?.length > 0) {
              return (
                <>
                <TutorUpdatePage setTutorUpdate={setTutorUpdate} tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData} />
                </>
              );
            }

            // If Tutor doesn't exists
            else {
              return (
                <>
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
                </>
              );
            }

          }

          // Data is loading in
          else {
            return (
              <>
              <Skeleton animation="wave" variant="rounded" width="100%"> </Skeleton>
              </>
            );
          }

        }

        // Tutee Update Page
        if (tab === 1) {

          // Initial Fetch complete
          if (tuteeIsSuccess) {

            // If tutee exists
            if (tuteeData?.length > 0) {
              return (
                <>
                <TuteeUpdatePage setTuteeUpdate={setTuteeUpdate} tuteeProfileData={tuteeProfileData} setTuteeProfileData={setTuteeProfileData} />
                </>
              );
            }

            // If Tutee doesn't exists
            else {
              return (
                <>
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
                </>
              );
            }
          }

          // Data is loading
          else if (tuteeIsFetching || tuteeIsLoading) {
            return (
              <>
              <Skeleton animation="wave" variant="rounded" width="100%"> </Skeleton>
              </>
            );
          }
        }

        return (<></>);

      })()}
        
    </div>
  );
}

export default ProfilePage;
