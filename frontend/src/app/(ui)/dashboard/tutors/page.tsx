'use client';


import * as React from 'react';

import { Box, Container, Grid, Stack, Skeleton, Pagination, Typography, ToggleButtonGroup, ToggleButton, ButtonBase 
, Avatar}
from '@mui/material';

import { TutorCard, TutorSkeleton }
  from '@/app/(ui)/tutor-card';
import TutorFilter from './tutor-filter';
import TutorProfile from './tutor-profile';
import { TableFetch } 
from '@/app/_lib/data';


const tutorsPerPageOptions = [ 5, 10, 15 ];

const tutorSkeleton: Tutor = { activeStatusName: "active", averageRating: 0, bioText: "", coursePreferences: [], email: "", firstName: "", lastName: "", 
  listingTitle: "", locationPreferences: [], majorAbbreviation: "", numberOfRatings: 0, payRate: 0, phoneNumber: 0, pictureUrl: "", seniorityName: "Freshman" };


export default function TutorPage() {
  const [search, setSearch] = React.useState<string>("");
  const [sort, setSort] = React.useState("average_rating_descending");
  const [rate, setRate] = React.useState([0, 200]);
  const [major, setMajor] = React.useState<string | null>(null);
  const [course, setCourse] = React.useState<string | null>(null);
  const [seniority, setSeniority] = React.useState<Seniority>("All");
  const [selectedTutor, setSelectedTutor] = React.useState<Tutor | null>(null);

  const [tutorsPerPage, setTutorsPerPage] = React.useState(5);
  const handleTutorsPerPageChange = (event: any, value: number) => {
    value && setTutorsPerPage(value);
  };
  
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  // Database Fetching
  const { data: tutorData, isLoading: tutorIsLoading, isFetching: tutorIsFetching, refetch: tutorRefetch } = 
  TableFetch<TutorQuery>("tutor", [tutorsPerPage, page, sort, major, course, seniority], `number_entries_per_page=${tutorsPerPage}`, `page_number=${page}`, 
    `sort_by=${sort}`,
    `pay_rate_greater_than_or_equals=${rate[0]}`,
    `pay_rate_less_than_or_equals=${rate[1]}`,
    `course_preference_major_abbreviation_contains=${major ? major : ""}`,
    `course_preference_number_equals=${course ? course : ""}`,
    `contains=${search}`,
  );
  
  // Listen to page or tutorData change. Restrains page number to less than total pages from pagination data
  // If page is larger than total pages, set to max page to prevent display error, i.e. Current Page 3 > Total Pages 2
  React.useEffect(() => {
    setPage(Math.max(Math.min(page, (tutorData ? tutorData?.metaData?.totalNumberPages : page)), 1));
  }, [page, tutorData]);


  // Display tutor information as tutor cards
  const printTutors = () => {
    if (tutorIsLoading) {
      return ( <TutorSkeleton /> );
    } 
    else if (tutorData && tutorData?.data?.length > 0) { 
      return tutorData?.data?.map((tutor: Tutor, index: number) => (
        <ButtonBase onClick={() => setSelectedTutor(tutor)} disableRipple key={index}> 
          <TutorCard elevation={4} tutor={tutor} key={index} />
        </ButtonBase>
      ));
    }
    
    return (
      <Typography variant="h4"> Could not find any tutors. . . </Typography>
    )
  };


  return (
    <Box position="static" mb="40px">
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container direction="row" spacing={2} my="10px">
          <Grid item xs={12} md={4}>
            <TutorFilter 
              rate={[rate, setRate]} 
              sort={[sort, setSort]} 
              major={[major, setMajor]} course={[course, setCourse]} 
              seniority={[seniority, setSeniority]} 
              tutorRefetch={tutorRefetch}
              search={[search, setSearch]}   
            />
          </Grid>

          <TutorProfile tutorState={[selectedTutor, setSelectedTutor]} />

          <Grid item xs={12} md={8}>
            <Stack direction="column" spacing={2}>
              { printTutors() }

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