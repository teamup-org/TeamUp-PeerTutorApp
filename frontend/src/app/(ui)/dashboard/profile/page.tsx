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
  const {tutorProfileData, setTutorProfileData, setTranscript} = props

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setTranscript(file);
    } else {
      console.log("No file selected");
    }
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const course = tutorProfileData?.eligibleCourses[index];
    const courseIdentifier = `${course.majorAbbreviation} ${course.courseNumber}`;
    const updatedTutorProfileData = { ...tutorProfileData };

    if (isChecked) {
      updatedTutorProfileData.coursePreferences.push(course);
    } else {
      const courseIndex = updatedTutorProfileData.coursePreferences.findIndex((c: any) => `${c.majorAbbreviation} ${c.courseNumber}` === courseIdentifier);
      if (courseIndex !== -1) {
        updatedTutorProfileData.coursePreferences.splice(courseIndex, 1);
      }
    }

    setTutorProfileData(updatedTutorProfileData);
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
              {tutorProfileData?.eligibleCourses.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{`${item.majorAbbreviation} ${item.courseNumber}`}</TableCell>
                  <TableCell>{item.courseGrade}</TableCell>
                  <TableCell>
                  <Checkbox
                    checked={tutorProfileData?.coursePreferences.some((c: any) => `${c.majorAbbreviation} ${c.courseNumber}` === `${item.majorAbbreviation} ${item.courseNumber}`)}
                    onChange={(event) => handleCheckboxChange(index, event.target.checked)}
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
        </div>
  );

}

function LocationPreferences(props: any) {

  const { tutorProfileData, setTutorProfileData } = props;
  
  const locationOptions: LocationType[] = [
    "in-person on-campus",
    "in-person off-campus",
    "online"
  ];

  const locationChange = (location: LocationType) => {
    if (tutorProfileData.locationPreferences.includes(location)) {
      const updatedLocationPreferences = tutorProfileData.locationPreferences.filter((l: LocationType) => l !== location);
      setTutorProfileData({ ...tutorProfileData, locationPreferences: updatedLocationPreferences });
    } else {
      const updatedLocationPreferences = [...tutorProfileData.locationPreferences, location];
      setTutorProfileData({ ...tutorProfileData, locationPreferences: updatedLocationPreferences });
    }
  };

  return (
    <div style={{ marginBottom: '2vh' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Preferred</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationOptions.map((location, index) => (
                <TableRow key={index}>
                  <TableCell>{location}</TableCell>
                  <TableCell>
                  <Checkbox
                    checked={tutorProfileData.locationPreferences.some((loc: { locationName: LocationType; email: string; }) => loc.locationName === location)}
                    onChange={() => locationChange(location)}
                  />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );

}

function TutorUpdatePage(props: any) {
  const { setLocationUpdate, setTranscript, tutorProfileData, setTutorProfileData, setTutorUpdate, setEligibleUpdate, setPreferencesUpdate } = props;

  const handleInputChange = (field: keyof typeof tutorProfileData) => (newValue: string | number) => {
    setTutorProfileData({ ...tutorProfileData, [field]: newValue });
  };

  const handleGeneralUpdate = () => {
    setTutorUpdate(true);
  };

  const handleEligibleCoursesUpdate = () => {
    setEligibleUpdate(true);
  };

  const handleCoursePreferencesUpdate = () => {
    setPreferencesUpdate(true);
  };

  const handleLocationPreferencesUpdate = () => {
    setLocationUpdate(true);
  }

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
            Here is Your Current Course Information!! You can update your transcript or course preferences here!
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <EligibleCoursesTable setTranscript={setTranscript} tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData} />
          <Button variant="contained" color="primary" onClick={handleEligibleCoursesUpdate}>
            Update My Eligible Courses!
          </Button>
          <Button variant="contained" color="primary" onClick={handleCoursePreferencesUpdate}>
            Update My Course Preferences!
          </Button>
        </CardContent>

        <CardContent>
          <Typography variant="h6" gutterBottom>
            Update your Location Preferences Here!!
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <LocationPreferences tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData}  />
          <Button variant="contained" color="primary" onClick={handleLocationPreferencesUpdate}>
            Update My Location Preferences!
          </Button>
        </CardContent>

      </Card>
    </div>


  );

}


function ProfilePage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = React.useState(0);
  const [tutorUpdate, setTutorUpdate] = useState(false);
  const [eligibleUpdate, setEligibleUpdate] = useState(false);
  const [preferencesUpdate, setPreferencesUpdate] = useState(false);
  const [locationUpdate, setLocationUpdate] = useState(false);
  const [tuteeUpdate, setTuteeUpdate] = useState(false);
  const [updateOcurring, setUpdateOccuring] = useState(false);
  const [transcript, setTranscript] = useState<File>();

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

    if (eligibleUpdate) {
      updateTutorEligbleCourses();
    }

  },[eligibleUpdate]);

  useEffect(() => {

    if (locationUpdate) {
      updateTutorLocationPreferences();
    }

  },[locationUpdate]);

  useEffect(() => {

    if (preferencesUpdate) {
      updateTutorCoursePreferences();
    }

  },[preferencesUpdate]);

  useEffect(() => {

    if (tuteeUpdate) {
      updateTuteeInformation();
    }

  },[tuteeUpdate]);
  
  useEffect(() => {
    if (tutorData?.data && (tutorData.data.length > 0)) {
      setTutorProfileData(tutorData?.data[0]);

    }
  }, [tutorData]);

  useEffect(() => {
    if (tuteeData && (tuteeData.length > 0)) {
      setTuteeProfileData(tuteeData[0]);

    }
  }, [tuteeData]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const generateLocationString = (locations: { locationName: LocationType; tutorEmail: string; }[]): string => {
    return locations.join(", ");
  };

  const updateTutorLocationPreferences = () => {

    const newLocation = {
      email_old: tutorProfileData.email,
      location_preferences_new: generateLocationString(tutorProfileData.locationPreferences)
    }
    
    tutorMutationUpdate.mutate(newLocation);
    setLocationUpdate(false);

  };

  const updateTutorEligbleCourses = () => {

    const newEligible = {
      email_old: tutorProfileData.email,
      transcript: transcript
    }

    tutorMutationUpdate.mutate(newEligible);
    setEligibleUpdate(false);

  };

  const generateCourseString = (courses: Course[]): string => courses.map(course => `${course.majorAbbreviation} ${course.courseNumber} ${course.courseGrade}`).join(", ");

  const updateTutorCoursePreferences = () => {

    const newPreferences = {
      email_old: tutorProfileData.email,
      course_preferences_new: generateCourseString(tutorProfileData?.coursePreferences)
    }

    tutorMutationUpdate.mutate(newPreferences);
    setPreferencesUpdate(false);

  };

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

        if (updateOcurring) {
          return (
            <>
            <Skeleton animation="wave" variant="rounded" width="100%"> </Skeleton>
            </>
          );
        }

        // Tutor Update Page
        if (tab === 0) {

          // Initial Fetch Complete
          if (tutorIsSuccess) {

            // If tutor exists
            if (tutorData?.data?.length > 0) {
              return (
                <>
                <TutorUpdatePage setTranscript={setTranscript} setLocationUpdate={setLocationUpdate} setEligibleUpdate={setEligibleUpdate} setPreferencesUpdate={setPreferencesUpdate} setTutorUpdate={setTutorUpdate} tutorProfileData={tutorProfileData} setTutorProfileData={setTutorProfileData} />
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
