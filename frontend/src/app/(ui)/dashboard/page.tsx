'use client';


import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps }
  from '@mui/material/transitions';
import { Box, Container, Grid, Stack, Paper, Typography, Dialog, DialogTitle, DialogContent, IconButton, Slide } 
  from '@mui/material';

import { useSession }
  from 'next-auth/react';

import { TableFetch }
  from '@/app/_lib/data';
import PendingReview from './pending-review';
import Review from './tutors/review';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DashboardPage() {
  const [selectedPendingReview, setSelectedPendingReview] = React.useState<Appointment | null>(null);

  const userEmail = useSession().data?.user?.email;

  const { data: pendingReviewData, isLoading: loading } = TableFetch<Appointment[]>("tutor_review/pending_reviews", [userEmail], `tutee_email=${userEmail}`);


  return (
    <Box position="relative" sx={{top: 50}}>
      <Container maxWidth="lg">
        
        <Grid container>
          <Grid item md={7}>

          </Grid>

          <Grid item md={5}>
            <Paper elevation={4} sx={{ p: 2 }}>
              <Stack direction="column" spacing={2}>
                <Typography align="center" variant="h4" borderBottom={1} borderColor="divider"> Pending Tutor Reviews </Typography>

                { pendingReviewData && pendingReviewData.length ? 
                  pendingReviewData.map((pending) => {
                    return <PendingReview pendingReview={pending} setPendingReview={setSelectedPendingReview} />
                  })
                  :
                  <Typography variant="h5" align="center"> No Reviews to Write! </Typography>
                }
              </Stack>
            </Paper>
          </Grid>
        </Grid>

      </Container>
      
      { selectedPendingReview && 
      <Dialog 
        open={selectedPendingReview ? true : false} onClose={() => setSelectedPendingReview(null)}
        TransitionComponent={Transition} keepMounted 
        aria-describedby="alert-tutor-profile"
        maxWidth="md" fullWidth
      >
        <DialogTitle> 
          <Stack direction="row" spacing={2}>
            <IconButton aria-label="close" onClick={() => setSelectedPendingReview(null)} > 
              <CloseIcon />
            </IconButton>

            <Typography variant="h3"> Writing Review . . . </Typography>
          </Stack>
        </DialogTitle>
        
        <DialogContent dividers sx={{ pt: 4, pb: 8 }}>
          <Container maxWidth="lg">
            <Review editable />
          </Container>
        </DialogContent>

      </Dialog>
      }
    </Box>
  );
}
