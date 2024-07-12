'use client';

import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Container, Grid, Stack, Paper, Typography, Dialog, DialogTitle, DialogContent, IconButton, 
  Slide, List, Skeleton } from '@mui/material';
import { useUser } from "@auth0/nextjs-auth0/client";
import { TableFetch } from '@/app/_lib/data';
import { toTitleCase } from '@/app/_lib/utils';
import PendingReview from './pending-review';
import Review from './review';
import AppRating from '../app-rating'; // Import AppRating component
import axios from 'axios';

// Transition component for popup elements
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DashboardPage() {
  const [selectedPendingReview, setSelectedPendingReview] = React.useState<PendingReview | null>(null);
  const [showRatingPopup, setShowRatingPopup] = React.useState(false); // State for rating popup
  const { user } = useUser();
  const userEmail = user?.email;

  // Periodically check for user feedback popup status
  React.useEffect(() => {
    const checkPopupStatus = async () => {
        if (userEmail) {
            try {
                const response = await axios.get(`/user_feedback/popup_status`, { params: { userId: userEmail } });
                setShowRatingPopup(response.data);
            } catch (error) {
                console.error("Error fetching popup status:", error);
            }
        }
    };  

    const interval = setInterval(checkPopupStatus, 1000);
    return () => clearInterval(interval);
  }, [userEmail]);

  // Get pending reviews for user's profile
  const { data: pendingReviewData, isLoading: loading, refetch } = TableFetch<PendingReview[]>("tutor_review/pending_reviews", [userEmail], `tutee_email=${userEmail}`);

  return (
    <Box position="relative" sx={{ top: 50 }}>
      <Container maxWidth="lg">
        <Stack direction="column">
          <Grid container direction="row" columnSpacing={4} height={400}>
            <Grid item md={7}>
              <Skeleton sx={{ height: '100%' }} animation={false} />
            </Grid>
            <Grid item md={5} height="100%">
              <Paper elevation={4} sx={{ p: 2, height: '100%' }}>
                <Stack direction="column" spacing={2} height="100%">
                  <Typography align="center" variant="h4" borderBottom={1} borderColor="divider"> Pending Tutor Reviews </Typography>
                  <List sx={{ overflowY: 'auto' }}>
                    {pendingReviewData && pendingReviewData.length ?
                      pendingReviewData.map((pending, index) => {
                        return <PendingReview key={index} pendingReview={pending} setPendingReview={setSelectedPendingReview} />
                      })
                      :
                      <Typography variant="h5" align="center"> No Reviews to Write! </Typography>
                    }
                  </List>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
          <Skeleton sx={{ height: 300 }} animation={false} />
        </Stack>
      </Container>
      
      {/* Popup Dialogue for writing a review */}
      <Dialog 
        open={selectedPendingReview ? true : false} onClose={() => setSelectedPendingReview(null)}
        TransitionComponent={Transition} keepMounted 
        aria-describedby="alert-tutor-profile"
        maxWidth="md" fullWidth
      >
        <DialogTitle>
          <Stack direction="row" spacing={2} alignContent="center">
            <IconButton aria-label="close" onClick={() => setSelectedPendingReview(null)} sx={{ width: 50, height: 50 }} > 
              <CloseIcon />
            </IconButton>
            <Typography variant="h3"> Writing Review for {toTitleCase(`${selectedPendingReview?.tutorFirstName} ${selectedPendingReview?.tutorLastName}`)} </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 4, pb: 8 }}>
          <Container maxWidth="lg">
            <Review editable pendingReview={[selectedPendingReview, setSelectedPendingReview]} refetch={refetch} key={new Date().getTime()} />
          </Container>
        </DialogContent>
      </Dialog>

      {/* Rating Popup */}
      <AppRating open={showRatingPopup} onClose={() => setShowRatingPopup(false)} userId={userEmail || ''} />
    </Box>
  );
}
