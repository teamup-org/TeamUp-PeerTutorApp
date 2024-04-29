'use client';


import React from 'react';

import { Stack, Paper, Typography, Divider, Avatar, Rating, Chip, Skeleton, SkeletonProps } 
  from '@mui/material';

import { toTitleCase, toPhoneNumber }
  from '@/app/_lib/utils'


/**
 * Component for displaying tutor cards
 * @param tutor - Tutor data to be formatted and displayed
 * @param disabled - Boolean variable for 'disabling' the tutor card, decreasing the card's opacity
 * @returns 
 */  
export function TutorCard({ tutor, disabled } : { tutor: Tutor, disabled?: boolean }) {
  // Helper function to print the tutor's course preferences as Chip components
  const printChips = () => {
    return tutor?.coursePreferences?.map((course: { courseGrade: string, courseNumber: number, majorAbbreviation: string, tutorEmail: string }, index: number) => (
      <Chip label={course.majorAbbreviation.toUpperCase() + course.courseNumber} color="primary" sx={{ width: 100 }} key={index}/>
    ));
  };


  return (
    <Paper variant="outlined" sx={{ p: 2, width: '100%', '&:hover, &.Mui-focusVisible': { borderColor: 'secondary.main' }, opacity: disabled ? 0.65 : 1 }}>
      <Stack direction="row" spacing={2} divider={ <Divider orientation="vertical" flexItem /> }>
        
        {/* Left 20% of tutor card | Name + Major + Seniority + Avatar + Payrate + Ratings */}
        <Stack direction="column" alignItems="center" spacing={1} width="20%">
          <Typography fontSize="1.5em" textAlign="center"> {toTitleCase(`${tutor?.firstName} ${tutor?.lastName}`)} </Typography>

          <Stack direction="row" spacing={1} divider={ <Divider orientation="vertical" flexItem /> }>
            <Typography fontSize="1em" color="text.secondary"> {tutor?.majorAbbreviation.toUpperCase()} </Typography>
            <Typography fontSize="1em" color="text.secondary"> {toTitleCase(`${tutor?.seniorityName}`)} </Typography>
          </Stack>

          <Avatar src={tutor?.pictureUrl} alt="Tutor profile picture" sx={{ width: '5em', height: '5em' }} />

          <Typography fontSize="1.5em" textAlign="center" borderBottom={1} borderColor="divider" sx={{ fontWeight: 'bold' }}>
            ${tutor?.payRate} / hr
          </Typography>

          <Stack direction="column" alignItems="center">
            <Rating name="read-only" value={tutor ? tutor.averageRating : 0} precision={0.5} readOnly />
            <Typography variant="body1" sx={{ fontSize: 10, fontWeight: 'bold' }}> ({tutor?.numberOfRatings}) </Typography>
          </Stack>
        </Stack>
      
        {/* Right 80% of tutor card | Tutor title + Course Preferences + Tutor Bio */}
        <Stack direction="column" spacing={1} minWidth="0%" width="80%">
          <Typography fontSize="1.5em" align="left"> {tutor?.listingTitle} </Typography>

          <Stack direction="row" spacing={1}>
            {/*<Button size="large" onClick={scrollRight} sx={{ width: '5px' }}> <KeyboardArrowLeftIcon/> </Button> */}

            <Stack 
              direction="row" 
              spacing={1} 
              whiteSpace="nowrap" 
              sx={{ 
                overflowX: 'auto', 
                '&::-webkit-scrollbar': {display: 'none'}, 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none' 
              }}
              // ref={stackRef}
            >
              { printChips() }
            </Stack>

            {/*<Button size="large" onClick={scrollRight} sx={{ width: '5px' }}> <KeyboardArrowRightIcon/> </Button>*/}
          </Stack>

          <Typography align="left">
            {tutor?.bioText}
          </Typography>
          
          <Stack direction="column" height="100%" justifyContent="end">
            <Typography align="left"> {`${tutor?.email} | ${toPhoneNumber(`${tutor?.phoneNumber}`)}`} </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}


/**
 * @function React Skeleton Card Component when loading tutors
 * @returns JSX Component for Skeletonized TutorCard
 */
export function TutorSkeleton() {
  const SkeletonWave = (props: SkeletonProps) => {
    return (
      <Skeleton animation="wave" {...props}>
        {props.children}
      </Skeleton>
    );
  };


  return (
    <Paper variant="outlined" sx={{ p: 2, width: '100%' }}>
      <Stack direction="row">
        <Stack direction="column" alignItems="center" spacing={1} minWidth="0%" width="20%">
          <SkeletonWave>
            <Typography variant="h6" textAlign="center"> AAAAAAAAA </Typography>
          </SkeletonWave>

          <SkeletonWave variant="circular">
            <Avatar sx={{ width: 100, height: 100 }} />
          </SkeletonWave>

          <SkeletonWave>
            <Typography variant="h6" width="100%" textAlign="center" sx={{ fontWeight: 'bold' }}>
              $50 / hr
            </Typography>
          </SkeletonWave>

          <Divider variant="middle" orientation="horizontal" flexItem/>

          <Stack direction="column" alignItems="center">
            <SkeletonWave>
              <Rating name="read-only" readOnly/>
            </SkeletonWave>

            <SkeletonWave>
              <Typography variant="body1" sx={{ fontSize: 10, fontWeight: 'bold' }}> (AAA) </Typography>
            </SkeletonWave>
          </Stack>
        </Stack>

        <Divider variant="middle" orientation="vertical" flexItem sx={{ mx: 2 }}/>

        <Stack direction="column" spacing={1} minWidth="0%" width="80%">
          <SkeletonWave>
            <Typography variant="h6" align="left"> AAAAAAAAAAAAAAAAAAAAAA </Typography>
          </SkeletonWave>

          <Stack direction="row" spacing={1}>
            <Stack 
              direction="row" 
              spacing={1} 
              whiteSpace="nowrap" 
            >
              <SkeletonWave variant="rounded">
                <Chip label="AAAAAAAA" /> 
              </SkeletonWave>
              <SkeletonWave variant="rounded">
                <Chip label="AAAAAAAA" /> 
              </SkeletonWave>
              <SkeletonWave variant="rounded">
                <Chip label="AAAAAAAA" /> 
              </SkeletonWave>
              <SkeletonWave variant="rounded">
                <Chip label="AAAAAAAA" /> 
              </SkeletonWave>
              <SkeletonWave variant="rounded">
                <Chip label="AAAAAAAA" /> 
              </SkeletonWave>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={2} pt={4}>
            <SkeletonWave>
              <Typography align="left">
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </Typography>
            </SkeletonWave>

            <SkeletonWave>
              <Typography align="left">
                AAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </Typography>
            </SkeletonWave>

            <SkeletonWave>
              <Typography align="left">
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </Typography>
            </SkeletonWave>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
