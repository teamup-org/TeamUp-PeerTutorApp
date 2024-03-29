
import * as React from 'react';

import { Container, Box, Grid, Stack, Typography, Rating, LinearProgress, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent }
  from '@mui/material';

import Review from './review';
import { TableFetch } from '@/app/_lib/data';


const sortOptions = [
  { label: "Top Reviews", query: "top_reviews" }, 
  { label: "Most Recent", query: "recent_reviews" },
];

const filterOptions = [
  { label: "All Stars", query: "05" }, 
  { label: "5 Stars", query: "55" }, 
  { label: "4 Stars", query: "44" }, 
  { label: "3 Stars", query: "33" }, 
  { label: "2 Stars", query: "22" }, 
  { label: "1 Stars", query: "11" }, 
];


export default function TutorProfileReviews({ tutorEmail }: { tutorEmail: string }) {
  const [sort, setSort] = React.useState(sortOptions[0].query);
  const [filter, setFilter] = React.useState(filterOptions[0].query);
  const [starWeights, setStarWeights] = React.useState([0, 0, 0, 0, 0]);
  const [rating, setRating] = React.useState(0.0);

  const review: Review = {
    appointmentId: 2, numberStars: 4, 
    reviewText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit libero volutpat sed cras ornare arcu. Id porta nibh venenatis cras sed felis eget. Sed velit dignissim sodales ut eu sem integer vitae. Etiam sit amet nisl purus in. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Pulvinar neque laoreet suspendisse interdum. Neque ornare aenean euismod elementum. Et ultrices neque ornare aenean euismod elementum nisi quis. Volutpat est velit egestas dui id ornare arcu odio ut. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Donec et odio pellentesque diam volutpat.
    In iaculis nunc sed augue lacus. A lacus vestibulum sed arcu non odio euismod lacinia at. Facilisis gravida neque convallis a cras semper. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Adipiscing commodo elit at imperdiet dui. Diam ut venenatis tellus in. Ante metus dictum at tempor commodo. Vulputate eu scelerisque felis imperdiet. Egestas pretium aenean pharetra magna ac placerat vestibulum. Nisi lacus sed viverra tellus. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Suspendisse sed nisi lacus sed viverra tellus in. Ipsum consequat nisl vel pretium lectus quam. Id interdum velit laoreet id donec ultrices. Sed arcu non odio euismod lacinia at. Risus pretium quam vulputate dignissim. Aenean et tortor at risus. At quis risus sed vulputate odio ut enim blandit volutpat.`, 
    tuteeEmail: "kylel@gmail.com", tutorEmail: "jon" 
  };

  const mapOptions = (options: {label: string, query: string}[]) => {
    return options.map((option, index) => (
      <MenuItem key={index} value={option.query}> {option.label} </MenuItem>
    ));
  };

  const mapStars = () => {
    var stars: React.JSX.Element[] = [];
    
    for (let i = 5; i > 0; i--) {
      stars.push(
        <Stack key={5 - i} direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" width={50} align="right"> {i} star </Typography>

          <LinearProgress variant="determinate" value={starWeights[i - 1]} sx={{ width: '90%', height: 12, borderRadius: 8 }} />

          <Typography variant="body1" width={25} align="right"> {starWeights[i - 1]}% </Typography>
        </Stack>
      );
    }

    return stars;
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const { data: reviewData, isLoading: reviewIsLoading, isFetching: reviewIsFetching, refetch: reviewRefetch } = 
    TableFetch<ReviewQuery>("tutor_review", [sort, filter, tutorEmail], 
      `tutor_email_contains=${tutorEmail}`,
      `page_number=${1}`,
      `number_entries_per_page=${5}`,
      `number_stars_greater_than_or_equals=${filter[0]}`,
      `number_stars_less_than_or_equals=${filter[1]}`
    );

  const printReviews = () => {
    if (reviewData && reviewData?.data?.length > 0) { 
      return reviewData.data.map((review: Review, index: number) => (
        <Review key={index} review={review} />
      ));
    }
  };


  return (
    <Container maxWidth="xl">
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={2} borderBottom={1} borderColor="divider" pb={2} position="sticky" top={20}>
            <Stack direction="row" spacing={4} justifyItems="center">
              <Stack direction="column" alignItems="center" justifyItems="center">
                <Typography variant="h2"> {rating} </Typography>

                <Rating value={rating} precision={0.5} readOnly />

                <Typography variant="body1"> (30k) </Typography>
              </Stack>

              <Stack direction="column" width={500}>
                { mapStars() }
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="sort-select-label"> Sort By </InputLabel>
                <Select value={sort} onChange={handleSortChange} labelId="sort-select-label" id="sort-select" label="Sort By">
                  { mapOptions(sortOptions) }
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="filter-select-label"> Filter By </InputLabel>
                <Select value={filter} onChange={handleFilterChange} labelId="filter-select-label" id="filter-select" label="Filter By">
                  { mapOptions(filterOptions) }
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Grid>
        
        <Grid item md={7}>
          <Stack direction="column" spacing={4}>
            { printReviews() }
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
