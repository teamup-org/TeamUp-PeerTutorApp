'use client';

import * as React from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Container, Grid, Stack, Paper, Typography, Dialog, DialogTitle, DialogContent, IconButton, Slide, List, Skeleton, Button, TextField, Rating, DialogActions } from '@mui/material';
import { useUser } from "@auth0/nextjs-auth0/client";
import { TableFetch } from '@/app/_lib/data';
import { toTitleCase } from '@/app/_lib/utils';
import PendingReview from './pending-review';
import Review from './review';

// Transition component for popup elements
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @function React Component for Tutor Page
 * @returns JSX Component for Tutor Page
 */
export default function DashboardPage() {
  const [selectedPendingReview, setSelectedPendingReview] = React.useState<PendingReview | null>(null);
  const [isRatingOpen, setIsRatingOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState<{ [key: string]: string }>({
    feedback1: '',
    feedback2: '',
    feedback3: '',
    feedback4: '',
    feedback5: '',
    feedback6: '',
    feedback7: ''
  });

  const { user } = useUser();
  const userEmail = user?.email;

  // Get pending reviews for user's profile
  const { data: pendingReviewData, isLoading: loading, refetch } = TableFetch<PendingReview[]>("tutor_review/pending_reviews", [userEmail], `tutee_email=${userEmail}`);

  // Function to open rating dialog
  const handleOpenRating = () => {
    setIsRatingOpen(true);
  };

  // Function to close rating dialog
  const handleCloseRating = () => {
    setIsRatingOpen(false);
  };

  // Function to handle rating change
  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };

  // Function to handle feedback change
  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback({
      ...feedback,
      [event.target.name]: event.target.value
    });
  };

  // Function to submit feedback
  const handleSubmitFeedback = async () => {
    try {
      await axios.post('/user_feedback/submit', {
        userId: userEmail,
        rating,
        ...feedback
      });
      handleCloseRating();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  React.useEffect(() => {
    const checkPopupStatus = async () => {
      try {
        if (userEmail) {
          console.log("User email:", userEmail);
          const response = await axios.get(`/user_feedback/popup_status?userId=${encodeURIComponent(userEmail)}`);
          if (response.data.showPopup) {
            setIsRatingOpen(true);
          }
        }
      } catch (error) {
        console.error("Error checking popup status:", error);
      }
    };    
    checkPopupStatus();
  }, [userEmail]);

  return (
    <Box position="relative" sx={{ top: 50 }}>
      <Container maxWidth="lg">
        <Stack direction="column">

          <Grid container direction="row" columnSpacing={4} height={400}>
            {/* Left side of Dashboard */}
            <Grid item md={7}>
              <Skeleton sx={{ height: '100%' }} animation={false} />
            </Grid>

            {/* Right side of Dashboard */}
            <Grid item md={5} height="100%">
              {/* Pending Reviews */}
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

          {/* Bottom of Dashboard */}
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

      {/* Popup Dialogue for App Rating */}
      <Dialog
        open={isRatingOpen} onClose={handleCloseRating}
        TransitionComponent={Transition} keepMounted
        aria-labelledby="rate-app-dialog"
        maxWidth="sm" fullWidth
      >
        <DialogTitle id="rate-app-dialog">
          <Stack direction="row" spacing={2} alignContent="center">
            <Typography variant="h5">Rate Our App</Typography>
            <IconButton aria-label="close" onClick={handleCloseRating} sx={{ marginLeft: 'auto' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Rating
              name="app-rating"
              value={rating}
              onChange={handleRatingChange}
              size="large"
            />
            {Array.from({ length: 7 }).map((_, index) => (
              <TextField
                key={index}
                name={`feedback${index + 1}`}
                label={`Feedback ${index + 1}`}
                value={feedback[`feedback${index + 1}`]}
                onChange={handleFeedbackChange}
                fullWidth
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitFeedback} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
