'use client';

import React, { useState, useEffect, SyntheticEvent } 
from 'react';

import { Box, Container, Grid, Stack, Skeleton, Pagination, Paper, 
  Slider, Select, SelectChangeEvent, MenuItem, FormControl, InputLabel, 
  Autocomplete, TextField, Typography, ToggleButtonGroup, ToggleButton }
from '@mui/material';

import TutorCard from '@/app/(ui)/tutor-card';
import { TableFetch } 
from '@/app/_lib/data';


function valuetext(value: number) {
  return `$${value}`;
}

function valueLabelFormat(value: number) {
  return `$${value}`;
}

const minKnobDistance = 10;

const sortOptions = [
  { label: "Rating", query: "average_rating_descending" },
  { label: "Lowest Payrate", query: "pay_rate_ascending" },
  { label: "Highest Payrate", query: "pay_rate_descending" }
];

const tutorsPerPageOptions = [ 5, 10, 15 ];


export default function TutorPage() {
  const [tutorsPerPage, setTutorsPerPage] = useState(5);
  const handleTutorsPerPageChange = (event: any, value: number) => {
    value && setTutorsPerPage(value);
  };

  const [page, setPage] = useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // if (!tutorIsLoading || !tutorIsFetching) window.scrollTo(0, 0);
  };

  const [rate, setRate] = useState([0, 200]);
  const handleRateChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRate([Math.min(newValue[0], rate[1] - minKnobDistance), rate[1]]);
    } else {
      setRate([rate[0], Math.max(newValue[1], rate[0] + minKnobDistance)]);
    }
  };

  const [sort, setSort] = useState("average_rating_descending");
  const handleSortChange = (event: SelectChangeEvent) => {
    let newSortBy: string = event.target.value;
    setSort(newSortBy);
    // window.scrollTo(0, 0);
  };

  const [major, setMajor] = useState<{label: string, firstLetter: string} | null>(null);
  const handleMajorChange = (event: any, value: {label: string, firstLetter: string} | null) => {
    setMajor(value);
  };

  const [course, setCourse] = useState<{label: number, firstNumber: number} | null>(null);
  const handleCourseChange = (event: any, value: {label: number, firstNumber: number} | null) => {
    setCourse(value);
  };

  // Database Fetching
  const { data: tutorData, isLoading: tutorIsLoading, isFetching: tutorIsFetching, refetch: tutorRefetch } = 
  TableFetch<TutorQuery>("tutor", `number_entries_per_page=${tutorsPerPage}`, `page_number=${page}`, 
    `sort_by=${sort}`,
    `pay_rate_greater_than_or_equals=${rate[0]}`, 
    `pay_rate_less_than_or_equals=${rate[1]}`,
    `course_major_abbreviation_contains=${major ? major.label : ""}`,
    `course_number_equals=${course ? course.label : ""}`
  );
  
  const { data: majorData, isLoading: majorIsLoading, isFetching: majorIsFetching, isPlaceholderData: majorIsPlaceholderData, refetch: majorRefetch } = 
    TableFetch<Major[]>("major");
  
  const { data: courseData, isLoading: courseIsLoading, isFetching: courseIsFetching, refetch: courseRefetch } =
    TableFetch<Course[]>("course", `major_abbreviation_contains=${major?.label}`);

  useEffect(() => {
    tutorRefetch();
  }, [tutorsPerPage, page, sort, major, course]);

  useEffect(() => {
    courseRefetch();
  }, [major]);
  
  const printTutors = () => {
    if (tutorIsLoading) {
      return (
        <Skeleton animation="wave" variant="rounded" height="275px" width="100%" />
      );
    } 
    else { 
      return tutorData?.data?.map((tutor: Tutor, index: number) => (
        <TutorCard tutor={tutor} key={index} />
      ));
    }
  };

  const populateMajorOptions = () => {
    if (majorData)
      return (majorData.map((major: Major) => { 
        return { label: (major.majorAbbreviation).toUpperCase(), firstLetter: major.majorAbbreviation[0].toUpperCase() }})).sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
    
    return [];
  };


  return (
    <Box position="static" mb="40px">
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container direction="row" spacing={2} my="10px">
          <Grid item xs={0} md={4}>
            <Paper elevation={4} sx={{ p: 2, minWidth: '0%', position: 'sticky', top: '10px' }}>
              <Stack direction="column" spacing={3}>
                <Typography variant="h4" alignSelf="center"> Filters </Typography>

                <FormControl fullWidth>
                  <InputLabel id="select-sort-label"> Sort By </InputLabel>
                  <Select labelId="select-sort-label" id="select-sort" value={sort} label="Sort By" onChange={handleSortChange}>
                    { sortOptions.map((option, index) => (<MenuItem value={option.query} key={index}> {option.label} </MenuItem>)) }
                  </Select>
                </FormControl>

                <Stack direction="row" spacing={2}>
                  <Stack direction="column" width="50%" spacing={1}>
                    <Typography fontWeight="bold"> Tutor's Major </Typography>
                    <Autocomplete 
                      fullWidth loading={majorIsLoading}
                      id="autocomplete-major" 
                      options={ majorData ? (majorData.map((major: Major) => { return { label: (major.majorAbbreviation).toUpperCase(), firstLetter: major.majorAbbreviation[0].toUpperCase() }})).sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter)) : [] } 
                      isOptionEqualToValue={ (option, value) => (option.label === option.label) }
                      groupBy={ (option) => option.firstLetter }
                      value={major || null} onChange={handleMajorChange} 
                      renderInput={ (params) => <TextField {...params} label="Major" /> } 
                    />
                  </Stack>

                  <Stack direction="column" width="50%" spacing={1}>
                    <Typography fontWeight="bold"> Tutor's Course </Typography>
                    <Autocomplete 
                      fullWidth 
                      id="autocomplete-course" 
                      options={ courseData ? (courseData.map((course: Course) => { return { label: course.courseNumber, firstNumber: Number(course.courseNumber.toString()[0]) }})).sort((a: any, b: any) => a.label - b.label) : [] }
                      isOptionEqualToValue={ (option, value) => (option.label === option.label) }
                      groupBy={ (option) => option.firstNumber.toString() }
                      value={course || null} onChange={handleCourseChange}
                      renderInput={ (params) => <TextField {...params} label="Course" /> }
                      disabled={ !major }
                    />
                  </Stack>
                </Stack>

                <Stack direction="column" spacing={2}>
                  <Typography variant="body1" fontWeight="bold"> Hourly Rate </Typography>
                  <Box px={1}>
                    <Slider 
                      valueLabelDisplay="on" valueLabelFormat={valueLabelFormat} getAriaLabel={() => ""} getAriaValueText={valuetext}
                      min={0} max={200} step={5} 
                      value={rate} onChange={handleRateChange} onChangeCommitted={() => tutorRefetch()}
                      disableSwap sx={{ '& .MuiSlider-valueLabel': { top: 4, backgroundColor: 'unset', '& *': { background: 'transparent', color: '#000' } } }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack direction="column" spacing={2} alignItems="center">
              { printTutors() }

              <Stack direction="row" width="100%" alignItems="center">
                <Box display="flex" flexGrow={1} justifyContent="center">
                  <Pagination 
                    color="primary" size="large"
                    count={tutorData?.metaData?.totalNumberPages} page={page} onChange={handlePageChange} 
                    disabled={tutorIsLoading || tutorIsFetching}
                  />
                </Box>

                <Stack direction="column" marginLeft="auto">
                  <Typography variant="body1" fontWeight="bold" alignSelf="end"> Per Page: </Typography>
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