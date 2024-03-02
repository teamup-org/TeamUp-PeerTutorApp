'use client';

import { useEffect, useState } from 'react';

import TutorCard from '../../tutor-card';
import { tutors } from '../../../(lib)/placeholder-data';
import { tableFetch } from '@/app/(lib)/data';

import { Box, Container, Grid, Button, Stack, Skeleton } from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

export default function TutorPage() {
  const [sortBy, setSortBy] = useState('firstName');
  const [isAscending, setIsAscending] = useState(true);
  const {data, isLoading, isError} = tableFetch("tutor");

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setIsAscending((prevIsAscending) => !prevIsAscending);
    } else {
      setIsAscending(true);
    }
    setSortBy(newSortBy);
  };

  //console.log(table);
  data?.sort((a: any, b: any) => {
    if (sortBy === 'firstName') {
      return isAscending ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName);
    } else if (sortBy === 'payRate') {
      return isAscending ? (a.payRate - b.payRate) : (b.payRate - a.payRate);
    } else if (sortBy === 'rating') {
      return isAscending ? (a.rating - b.rating) : (b.rating - a.rating);
    }
  });
  console.log(data);

  const printTutors = () => {
    return data?.map((tutor: Tutor) => (
      <Grid item xs={12} md={12} key={tutor.tutorId}>
          <TutorCard tutor={tutor}/>
      </Grid>
    ));
  }

  return (
    <Box position="static" mb="40px">
      <Container maxWidth="md" sx={{ width: '100%' }}>
        <Stack direction="row" spacing={2} my="20px">
          <Button variant="contained" onClick={() => handleSortChange('name')} startIcon={(sortBy === 'name') ? ((isAscending) ? <NorthIcon/> : <SouthIcon/>) : ""}>
            Sort Name
          </Button> 
          <Button variant="contained" onClick={() => handleSortChange('rate')} startIcon={(sortBy === 'rate') ? ((isAscending) ? <NorthIcon/> : <SouthIcon/>) : ""}>
            Sort Rate
          </Button>
          <Button variant="contained" onClick={() => handleSortChange('rating')} startIcon={(sortBy === 'rating') ? ((isAscending) ? <NorthIcon/> : <SouthIcon/>) : ""}>
            Sort Rating
          </Button>
        </Stack>
        <Grid container direction="row" spacing={2}>
          { isLoading ? (
            <Grid item xs={12} md={12}>
              <Skeleton animation="wave" variant="rounded" height="100px" />
            </Grid>
            ) : (
              printTutors() 
            )
          }
        </Grid>
      </Container>
    </Box>
  );
}