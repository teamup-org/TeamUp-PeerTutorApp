'use client';

import React, { useState, useEffect } 
from 'react';

import { Box, Container, Grid, Button, Stack, Skeleton, Pagination, Card, Slider }
from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

import TutorCard from '@/app/(ui)/tutor-card';
import { TableFetchPaginated } 
from '@/app/_lib/data';

function valuetext(value: number) {
  return `$${value}`;
}

const minDistance = 10;

export default function TutorPage() {
  const [sortBy, setSortBy] = useState('firstName');
  const [isAscending, setIsAscending] = useState(true);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isPlaceholderData, refetch } = TableFetchPaginated("tutor", page);
  
  const [rateSlider, setRateSlider] = useState([0, 200]);
  const handleRateSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRateSlider([Math.min(newValue[0], rateSlider[1] - minDistance), rateSlider[1]]);
    } else {
      setRateSlider([rateSlider[0], Math.max(newValue[1], rateSlider[0] + minDistance)]);
    }
  };

  useEffect(() => {
    refetch();
  }, [page]);

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setIsAscending((prevIsAscending) => !prevIsAscending);
    } else {
      setIsAscending(true);
    }
    setSortBy(newSortBy);
  };

  data?.data?.sort((a: any, b: any) => {
    if (sortBy === 'firstName') {
      return isAscending ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName);
    } else if (sortBy === 'payRate') {
      return isAscending ? (a.payRate - b.payRate) : (b.payRate - a.payRate);
    } else if (sortBy === 'averageRating') {
      return isAscending ? (a.averageRating - b.averageRating) : (b.averageRating - a.averageRating);
    }
  });
  
  const printTutors = () => {
    if (isLoading) {
      return (
        <Skeleton animation="wave" variant="rounded" height="100px" width="100%" />
      );
    } 
    else { 
      return data?.data?.map((tutor: Tutor, index: number) => (
        <TutorCard tutor={tutor}/>
      ));
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box position="static" mb="40px">
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container direction="row" spacing={2} my="10px">
          <Grid item xs={0} md={4} height="100%" position="sticky" top="0px">
            <Card elevation={4} sx={{ p: 2, minWidth: "0%" }}>
              <Stack direction="column" spacing={2}>
                <Slider min={0} value={rateSlider} onChange={handleRateSlider} step={5} valueLabelDisplay="auto" getAriaLabel={() => ""} getAriaValueText={valuetext} disableSwap />
                
                <Button variant="contained" onClick={() => handleSortChange('firstName')} startIcon={(sortBy === 'firstName') ? ((isAscending) ? <NorthIcon/> : <SouthIcon/>) : ""}>
                  Sort Name
                </Button> 
                <Button variant="contained" onClick={() => handleSortChange('payRate')} startIcon={(sortBy === 'payRate') ? ((isAscending) ? <NorthIcon/> : <SouthIcon/>) : ""}>
                  Sort Rate
                </Button>
                <Button variant="contained" onClick={() => handleSortChange('averageRating')} startIcon={(sortBy === 'averageRating') ? ((isAscending) ? <NorthIcon/> : <SouthIcon/>) : ""}>
                  Sort Rating
                </Button>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="column" spacing={2} alignItems="center">
              { printTutors() }
              <Pagination color="primary" size="large" count={data?.metaData?.totalNumberPages} page={page} onChange={handleChange} disabled={isLoading || isFetching} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}