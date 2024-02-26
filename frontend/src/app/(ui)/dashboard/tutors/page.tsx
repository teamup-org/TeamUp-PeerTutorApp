'use client';

import { useState } from 'react';

import TutorCard from '../../tutor-card';
import { tutors } from '../../../(lib)/placeholder-data';

import { Box, Container, Grid, Button, Stack} from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

export default function TutorPage() {
  const [sortBy, setSortBy] = useState('name');
  const [isAscending, setIsAscending] = useState(true);

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setIsAscending((prevIsAscending) => !prevIsAscending);
    } else {
      setIsAscending(true);
    }
    setSortBy(newSortBy);
  };

  const sortedTutors = tutors.slice().sort((a: any, b: any) => {
    if (sortBy === 'name') {
      return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'rate') {
      return isAscending ? (a.hourly_rate - b.hourly_rate) : (b.hourly_rate - a.hourly_rate);
    } else if (sortBy === 'rating') {
      return isAscending ? (a.rating - b.rating) : (b.rating - a.rating);
    }
  });

  const printTutors = () => {
    return sortedTutors.map((tutor: Tutor) => (
      <Grid item xs={12} md={12} key={tutor.id}>
          <TutorCard tutor={tutor}/>
      </Grid>
    ));
  }

  return (
    <Box position="static" mb="40px">
      <Container maxWidth="md" sx={{ width: '100%' }}>
        <Stack direction="row" spacing={2} my="20px">
          <Button variant="contained" onClick={() => handleSortChange('name')} startIcon={(isAscending) ? <NorthIcon/> : <SouthIcon/>}>
            Sort Name
          </Button> 
          <Button variant="contained" onClick={() => handleSortChange('rate')} startIcon={(isAscending) ? <NorthIcon/> : <SouthIcon/>}>
            Sort Rate
          </Button>
          <Button variant="contained" onClick={() => handleSortChange('rating')} startIcon={(isAscending) ? <NorthIcon/> : <SouthIcon/>}>
            Sort Rating
          </Button>
        </Stack>
        <Grid container direction="row" spacing={2}>
          { printTutors() }
        </Grid>
      </Container>
    </Box>
  );
}