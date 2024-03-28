'use client';


// import { useRef } from 'react';

import Image from 'next/image';

import type { SkeletonProps } from '@mui/material';
import { Box, Stack, Card, Typography, Divider, Avatar, Rating, Chip, Skeleton } 
from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { toTitleCase }
from '@/app/_lib/utils'
import React from 'react';

type TutorCardProps = { tutor: Tutor, elevation: number };
export function TutorCard(props: TutorCardProps) {
  /*const stackRef = useRef<HTMLDivElement>(null);
  const scrollRight = () => {
    if(stackRef.current) stackRef.current.scrollLeft += 100;
  };*/

  const printChips = () => {
    return props?.tutor?.coursePreferences?.map((course: { courseGrade: string, courseNumber: number, majorAbbreviation: string, tutorEmail: string }, index: number) => (
      <Chip label={course.majorAbbreviation.toUpperCase() + course.courseNumber} color="error" sx={{ width:100, }} key={index}/>
    ));
  };

  return (
    <Card elevation={props.elevation} sx={{ p: 2, width: '100%' }}>
      <Stack direction="row">
        <Stack direction="column" alignItems="center" spacing={1} minWidth="0%" width="20%">
          <Typography variant="h6" textAlign="center"> {toTitleCase(props.tutor?.firstName + " " + props.tutor?.lastName)} </Typography>

          <Avatar src={props.tutor?.pictureUrl} alt="Tutor profile picture" sx={{ width: 100, height: 100 }} />

          <Typography variant="h6" textAlign="center" borderBottom={1} borderColor="divider" sx={{ fontWeight: 'bold' }}>
            ${props.tutor?.payRate} / hr
          </Typography>

          <Stack direction="column" alignItems="center">
            <Rating name="read-only" value={props.tutor?.averageRating} precision={0.5} readOnly/>
            <Typography variant="body1" sx={{ fontSize: 10, fontWeight: 'bold' }}> ({props.tutor?.numberOfRatings}) </Typography>
          </Stack>
        </Stack>

        <Divider variant="middle" orientation="vertical" flexItem sx={{ mx: 2 }}/>

        <Stack direction="column" spacing={1} minWidth="0%" width="80%">
          <Typography variant="h6" align="left"> {props.tutor?.listingTitle} </Typography>

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
            {props.tutor?.bioText}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}


export function TutorSkeleton() {
  const SkeletonWave = (props: SkeletonProps) => {
    return (
      <Skeleton animation="wave" {...props}>
        {props.children}
      </Skeleton>
    );
  };


  return (
    <Card elevation={4} sx={{ p: 2, width: '100%' }}>
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
    </Card>
  );
}
