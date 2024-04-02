
import * as React from 'react';

import { Container, Box, Grid, Stack, Typography, Rating, LinearProgress, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button }
  from '@mui/material';

import Review from '../review';
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

const calculateRatingDistribution = (tutor: Tutor) => {
  var dist = [
    (tutor.numberOneStarRatings   / tutor.numberOfRatings) * 100,
    (tutor.numberTwoStarRatings   / tutor.numberOfRatings) * 100,
    (tutor.numberThreeStarRatings / tutor.numberOfRatings) * 100,
    (tutor.numberFourStarRatings  / tutor.numberOfRatings) * 100,
    (tutor.numberFiveStarRatings  / tutor.numberOfRatings) * 100,
  ];
  
  return dist;
};

export default function TutorProfileReviews({ tutor }: { tutor: Tutor }) {
  const [sort, setSort] = React.useState(sortOptions[0].query);
  const [filter, setFilter] = React.useState(filterOptions[0].query);
  const [starWeights, setStarWeights] = React.useState<number[]>([]);
  React.useEffect(() => {
    setStarWeights(calculateRatingDistribution(tutor));
  }, [tutor]);


  const mapOptions = (options: {label: string, query: string}[]) => {
    return options.map((option, index) => (
      <MenuItem key={index} value={option.query}> {option.label} </MenuItem>
    ));
  };

  const mapStars = () => {
    return starWeights.toReversed().map((weight: number, index) => (
        <Stack key={index} direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" width={50} align="right"> {5 - index} star </Typography>

          <LinearProgress variant="determinate" value={weight} sx={{ width: '90%', height: 12, borderRadius: 8 }} />

          <Typography variant="body1" width={25} align="right"> {weight}% </Typography>
        </Stack>
      )
    );
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const { data: reviewData, isLoading: reviewIsLoading, isFetching: reviewIsFetching, refetch: reviewRefetch } = 
    TableFetch<ReviewQuery>("tutor_review", [sort, filter, tutor], 
      `tutor_email_contains=${tutor?.email}`,
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

        {/* Left side of grid */}
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={4} position="sticky" top={20}>

            <Stack direction="column" spacing={2} borderBottom={1} borderColor="divider" pb={2}>

              {/* Average rating + review distribution row */}
              <Stack direction="row" spacing={4} justifyItems="center">
                {/* Average rating column */}
                <Stack direction="column" alignItems="center" justifyItems="center">
                  <Typography variant="h2"> {tutor?.averageRating ? tutor.averageRating.toFixed(1) : Number(0.0).toFixed(1)} </Typography>
                  <Rating value={tutor?.averageRating} precision={0.5} readOnly />
                  <Typography variant="body1"> ({tutor?.numberOfRatings ? tutor.numberOfRatings : 0}) </Typography>
                </Stack>

                {/* Print review distribution from 1 to 5 stars */}
                <Stack direction="column" width={500}>
                  { mapStars() }
                </Stack>
              </Stack>

              {/* Filter row */}
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
          </Stack>
        </Grid>
        
        
        {/* Right side of grid */}
        <Grid item md={7}>
          <Stack direction="column" spacing={4}>
            { printReviews() }
          </Stack>
        </Grid>

      </Grid>
    </Container>
  );
}
