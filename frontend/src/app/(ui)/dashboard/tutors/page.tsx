'use client';

import React, { useState, useEffect, SyntheticEvent } 
from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, Grid, Stack, Skeleton, Pagination, Paper, 
  Slider, Select, SelectChangeEvent, MenuItem, FormControl, InputLabel, 
  Autocomplete, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment, IconButton }
from '@mui/material';

import TutorCard from '@/app/(ui)/tutor-card';
import FilterBox from './filter-box';
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

const tutorSkeleton: Tutor = { activeStatusName: "", averageRating: 0, bioText: "", coursePreferences: [], email: "", firstName: "", lastName: "", 
  listingTitle: "", locationPreferences: [], majorAbbreviation: "", numberOfRatings: 0, payRate: 0, phoneNumber: 0, pictureUrl: "", seniorityName: "" };

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

  const [major, setMajor] = useState<string | null>(null);
  const handleMajorChange = (event: any, value: string | null) => {
    setMajor(value);
  };

  const [course, setCourse] = useState<string | null>(null);
  const handleCourseChange = (event: any, value: string | null) => {
    setCourse(value);
  };

  const [search, setSearch] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Database Fetching
  const { data: tutorData, isLoading: tutorIsLoading, isFetching: tutorIsFetching, refetch: tutorRefetch } = 
  TableFetch<TutorQuery>("tutor", [tutorsPerPage, page, sort, rate, major, course], `number_entries_per_page=${tutorsPerPage}`, `page_number=${page}`, 
    `sort_by=${sort}`,
    `pay_rate_greater_than_or_equals=${rate[0]}`, 
    `pay_rate_less_than_or_equals=${rate[1]}`,
    `course_major_abbreviation_contains=${major ? major : ""}`,
    `course_number_equals=${course ? course : ""}`
  );
  
  const { data: majorData, isLoading: majorIsLoading, isFetching: majorIsFetching, isPlaceholderData: majorIsPlaceholderData, refetch: majorRefetch } = 
    TableFetch<Major[]>("major");
  
  const { data: courseData, isLoading: courseIsLoading, isFetching: courseIsFetching, refetch: courseRefetch } =
    TableFetch<Course[]>("course", [major], `major_abbreviation_contains=${major}`);

  /*useEffect( () => {
    tutorRefetch();
    // window.scrollTo(0, 0);
  }, [tutorsPerPage, page, sort, major, course]);

  useEffect(() => {
    courseRefetch();
  }, [major]); */
  
  const printTutors = () => {
    if (tutorIsLoading) {
      return (
        <Skeleton animation="wave" variant="rounded" width="100%"> <TutorCard tutor={tutorSkeleton} /> </Skeleton>
      );
    } 
    else if (tutorData && tutorData?.data?.length > 0) { 
      return tutorData?.data?.map((tutor: Tutor, index: number) => (
        <TutorCard tutor={tutor} key={index} />
      ));
    }
    
    return (
      <Typography variant="h4"> Could not find any tutors. . . </Typography>
    )
  };

  const populateMajorOptions = () => {
    if (majorData)
      return (majorData.map( (major: Major) => (major.majorAbbreviation.toUpperCase()) ))
        .sort( (a, b) => (-b.localeCompare(a)) );

    return [];
  };

  const populateCourseOptions = () => {
    if (courseData)
      return (courseData.map( (course: Course) => (course.courseNumber.toString()) ))
        .sort( (a, b) => (-b.localeCompare(a)) );

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
                      options={populateMajorOptions()} 
                      isOptionEqualToValue={ (option, value) => (option === option) }
                      groupBy={ (option) => option[0] }
                      value={major || null} onChange={handleMajorChange} 
                      renderInput={ (params) => <TextField {...params} label="Major" /> } 
                    />
                  </Stack>

                  <Stack direction="column" width="50%" spacing={1}>
                    <Typography fontWeight="bold"> Tutor's Course </Typography>
                    <Autocomplete 
                      fullWidth 
                      id="autocomplete-course" 
                      options={populateCourseOptions()}
                      isOptionEqualToValue={ (option, value) => (option === option) }
                      groupBy={ (option) => option.toString()[0] }
                      value={course || null} onChange={handleCourseChange}
                      renderInput={ (params) => <TextField {...params} label="Course" /> }
                      disabled={!major}
                    />
                  </Stack>
                </Stack>

                <Stack direction="column" spacing={2}>
                  <Typography variant="body1" fontWeight="bold"> Hourly Rate </Typography>
                  <Box px={1}>
                    <Slider 
                      valueLabelDisplay="on" valueLabelFormat={valueLabelFormat} getAriaLabel={() => ""} getAriaValueText={valuetext}
                      min={0} max={200} step={5} 
                      value={rate} onChange={handleRateChange} onChangeCommitted={ () => tutorRefetch() }
                      disableSwap sx={{ '& .MuiSlider-valueLabel': { top: 4, backgroundColor: 'unset', '& *': { background: 'transparent', color: '#000' } } }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack direction="column" spacing={2} alignItems="center">
              <TextField 
                id="outlined-tutor-search" label="Search" variant="outlined" 
                value={search} onChange={handleSearchChange} onKeyUp={ (event) => {if (event.key === "Enter") console.log(search);} }
                fullWidth InputProps={{ endAdornment: (<Box height="100%"> <IconButton onClick={ () => console.log("Submit Search") }> <SearchIcon /> </IconButton> </Box>) }}
              />

              { printTutors() }

              <Stack direction="row" width="100%" alignItems="center">
                <Box display="flex" flexGrow={1} justifyContent="center">
                  <Pagination 
                    color="primary" size="large"
                    count={tutorData ? tutorData?.metaData?.totalNumberPages : 0} page={Math.min(page, tutorData ? tutorData?.metaData?.totalNumberPages : page)} onChange={handlePageChange} 
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