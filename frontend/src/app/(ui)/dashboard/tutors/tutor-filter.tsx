
'use client';


import * as React from 'react';

import { Paper, Stack, Typography, FormControl, InputLabel, Select, Autocomplete, MenuItem, TextField, Box, Slider, SelectChangeEvent }
from '@mui/material';

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

const seniorityOptions: Seniority[] = ["All", "Freshman", "Sophomore", "Junior", "Senior", "Graduate"];


export default function TutorFilter(
  { 
    rate: [rate, setRate], 
    sort: [sort, setSort], 
    major: [major, setMajor], 
    course: [course, setCourse], 
    seniority: [seniority, setSeniority], 
    search: [search, setSearch], 
    tutorRefetch 
  } 
  : 
  { 
    rate:      [number[],      Function],
    sort:      [string,        Function], 
    major:     [string | null, Function],
    course:    [string | null, Function],
    seniority: [string,        Function],
    search:    [string,        Function],
    tutorRefetch: Function 
  }
){
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

  const handleSortChange = (event: SelectChangeEvent) => {
    let newSortBy: string = event.target.value;
    setSort(newSortBy);
  };

  const handleMajorChange = (event: any, value: string | null) => {
    setMajor(value);
  };

  const handleCourseChange = (event: any, value: string | null) => {
    setCourse(value);
  };

  const handleSeniorityChange = (event: SelectChangeEvent) => {
    setSeniority(event.target.value);
  };


  // Database Fetching
  const { data: majorData, isLoading: majorIsLoading, isFetching: majorIsFetching, isPlaceholderData: majorIsPlaceholderData, refetch: majorRefetch } = 
    TableFetch<Major[]>("major", []);

  const { data: courseData, isLoading: courseIsLoading, isFetching: courseIsFetching, refetch: courseRefetch } =
    TableFetch<Course[]>("course", [major], `major_abbreviation_contains=${major}`);


  const populateMajorOptions = () => {
    if (majorData) return (majorData.map( (major: Major) => (major.majorAbbreviation.toUpperCase()) ))
                          .sort( (a, b) => (-b.localeCompare(a)) );

    return [];
  };

  const populateCourseOptions = () => {
    if (courseData) return (courseData.map( (course: Course) => (course.courseNumber.toString()) ))
                          .sort( (a, b) => (-b.localeCompare(a)) );

    return [];
  };


  return (
    <Paper elevation={4} sx={{ p: 2, minWidth: '0%', position: 'sticky', top: 10 }}>
      <Stack direction="column" spacing={3}>
        <Typography variant="h4" textAlign="center"> Filters </Typography>

        <FormControl fullWidth>
          <InputLabel id="select-sort-label"> Sort By </InputLabel>
          <Select labelId="select-sort-label" id="select-sort" value={sort} label="Sort By" onChange={handleSortChange}>
            { sortOptions.map((option, index) => (<MenuItem value={option.query} key={index}> {option.label} </MenuItem>)) }
          </Select>
        </FormControl>

        <Stack direction="column" spacing={2}>
          <Typography variant="body1" fontWeight="bold"> Hourly Rate </Typography>
          <Box px={1}>
            <Slider 
              valueLabelDisplay="on" valueLabelFormat={valueLabelFormat} getAriaLabel={() => ""} getAriaValueText={valuetext}
              min={0} max={200} step={5} 
              value={rate} onChange={handleRateChange} onChangeCommitted={ () => tutorRefetch({ queryKey: ["table-data", rate] }) }
              disableSwap sx={{ '& .MuiSlider-valueLabel': { top: 4, backgroundColor: 'unset', '& *': { background: 'transparent', color: '#000' } } }}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Stack direction="column" width="50%" spacing={1}>
            <Typography fontWeight="bold"> Tutor&apos;s Major </Typography>
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
            <Typography fontWeight="bold"> Tutor&apos;s Course </Typography>
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

        <FormControl fullWidth>
          <InputLabel id="select-seniority-label"> Seniority </InputLabel>
          <Select labelId="select-seniority-label" id="select-seniority" value={seniority} label="Seniority" onChange={handleSeniorityChange}>
            { seniorityOptions?.map((option, index) => (<MenuItem value={option} key={index}> {option} </MenuItem>)) }
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}