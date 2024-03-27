'use client';


import React, { useEffect, useState } 
from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Container, Grid, Stack, Skeleton, Pagination, Typography, ToggleButtonGroup, ToggleButton, 
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Slide, ButtonBase }
from '@mui/material';

import TutorCard from '@/app/(ui)/tutor-card';
import TutorFilter from './tutor-filter';
import { TableFetch } 
from '@/app/_lib/data';


const tutorsPerPageOptions = [ 5, 10, 15 ];

const tutorSkeleton: Tutor = { activeStatusName: "active", averageRating: 0, bioText: "", coursePreferences: [], email: "", firstName: "", lastName: "", 
  listingTitle: "", locationPreferences: [], majorAbbreviation: "", numberOfRatings: 0, payRate: 0, phoneNumber: 0, pictureUrl: "", seniorityName: "Freshman" };

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TutorPage() {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState("average_rating_descending");
  const [rate, setRate] = useState([0, 200]);
  const [major, setMajor] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [seniority, setSeniority] = useState<Seniority>("All");
  const [tutor, setTutor] = useState(0);

  const handleTutorChange = (newTutor: number) => {
    setTutor(newTutor);
  };

  const [tutorsPerPage, setTutorsPerPage] = useState(5);
  const handleTutorsPerPageChange = (event: any, value: number) => {
    value && setTutorsPerPage(value);
  };
  
  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  // Database Fetching
  const { data: tutorData, isLoading: tutorIsLoading, isFetching: tutorIsFetching, refetch: tutorRefetch } = 
  TableFetch<TutorQuery>("tutor", [tutorsPerPage, page, sort, major, course, seniority], `number_entries_per_page=${tutorsPerPage}`, `page_number=${page}`, 
    `sort_by=${sort}`,
    `pay_rate_greater_than_or_equals=${rate[0]}`, 
    `pay_rate_less_than_or_equals=${rate[1]}`,
    `course_major_abbreviation_contains=${major ? major : ""}`,
    `course_number_equals=${course ? course : ""}`,
    `contains=${search}`,
  );
  
  useEffect(() => {
    setPage(Math.max(Math.min(page, (tutorData ? tutorData?.metaData?.totalNumberPages : page)), 1));
  }, [page, tutorData]);


  // Display tutor information as tutor cards
  const printTutors = () => {
    if (tutorIsLoading || tutorIsFetching) {
      return (
        <Skeleton animation="wave" variant="rounded" width="100%"> <TutorCard tutor={tutorSkeleton} /> </Skeleton>
      );
    } 
    else if (tutorData && tutorData?.data?.length > 0) { 
      return tutorData?.data?.map((tutor: Tutor, index: number) => (
        <ButtonBase onClick={handleTutorProfileOpen} disableRipple> 
          <TutorCard tutor={tutor} key={index} />
        </ButtonBase>
      ));
    }
    
    return (
      <Typography variant="h4"> Could not find any tutors. . . </Typography>
    )
  };

  const [tutorProfileOpen, setTutorProfileOpen] = useState(false);
  const handleTutorProfileOpen = () => {
    // setTutor(newTutor);
    setTutorProfileOpen(true);
  };
  const handleTutorProfileClose = () => {
    setTutorProfileOpen(false);
  };


  return (
    <Box position="static" mb="40px">
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container direction="row" spacing={2} my="10px">
          <Grid item xs={0} md={4}>
            <TutorFilter 
              rate={[rate, setRate]} 
              sort={[sort, setSort]} 
              major={[major, setMajor]} course={[course, setCourse]} 
              seniority={[seniority, setSeniority]} 
              tutorRefetch={tutorRefetch}
              search={[search, setSearch]}   
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack direction="column" spacing={2} alignItems="center">
              { printTutors() }

              <Dialog 
                open={tutorProfileOpen} TransitionComponent={Transition} keepMounted 
                onClose={handleTutorProfileClose} aria-describedby="alert-tutor-profile"
                maxWidth="xl" fullWidth
              >
                <DialogTitle> <Typography variant="h2"> Tutor Title </Typography> </DialogTitle>
                <IconButton aria-label="close" onClick={handleTutorProfileClose} 
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                > 
                  <CloseIcon /> 
                </IconButton>

                <DialogContent dividers>

                </DialogContent>

              </Dialog>

              <Stack direction="row" width="100%" alignItems="center">
                <Box display="flex" flexGrow={1} justifyContent="center">
                  <Pagination 
                    color="primary" size="large"
                    count={tutorData ? tutorData?.metaData?.totalNumberPages : 0} page={page} onChange={handlePageChange} 
                    disabled={tutorIsLoading || tutorIsFetching}
                  />
                </Box>

                <Stack direction="column" marginLeft="auto" alignItems="end">
                  <Typography variant="body1" fontWeight="bold" alignSelf="end"> Tutors Per Page: </Typography>
                  <ToggleButtonGroup value={tutorsPerPage} onChange={handleTutorsPerPageChange} exclusive>
                    { 
                      tutorsPerPageOptions.map((option) => (
                        <ToggleButton value={option} key={option}> 
                          <Typography variant="body1"> {option} </Typography> 
                        </ToggleButton>
                      )) 
                    }
                  </ToggleButtonGroup>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}