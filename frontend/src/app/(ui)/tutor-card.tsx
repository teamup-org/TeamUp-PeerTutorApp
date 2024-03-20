'use client';

// import { useRef } from 'react';

import Image from 'next/image';

import { Box, Stack, Card, Typography, Divider, Avatar, Rating, Chip, Accordion, AccordionSummary, AccordionDetails } 
from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { toTitleCase }
from '@/app/_lib/utils'

type TutorCardProps = { tutor: Tutor };
export default function TutorCard(props: TutorCardProps) {
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
    <Card elevation={4} sx={{ p: 2, width: '100%' }}>
      <Stack direction="row">
        <Stack direction="column" alignItems="center" spacing={1} minWidth="0%" width="20%">
          <Typography variant="h6"> <center> {toTitleCase(props.tutor?.firstName + " " + props.tutor?.lastName)} </center> </Typography>

          <Avatar src={props.tutor?.pictureUrl} alt="Tutor profile picture" sx={{ width: 100, height: 100 }} />

          <Typography variant="h6" width="100%" sx={{ fontWeight: 'bold' }}>
            <center> ${props.tutor?.payRate} / hr </center>
            <Divider variant="middle" orientation="horizontal" flexItem/>
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

          {/*<Accordion>
            <AccordionSummary expandIcon={ <ExpandMoreIcon /> } aria-controls="tutor-content" id="tutor-header" />
            <AccordionDetails>
              Test
            </AccordionDetails>
            </Accordion>*/}
        </Stack>
      </Stack>
    </Card>
  );
}
