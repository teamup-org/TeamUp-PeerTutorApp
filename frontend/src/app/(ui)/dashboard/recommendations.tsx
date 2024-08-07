'use client';
import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { TableFetch } from '@/app/_lib/data'
import { Grid, Box, Container, Typography, Paper, CircularProgress } from '@mui/material';
import { getYouTubeVideos, Video, YouTubeResponse, AIChatRequest } from '@/app/_lib/utils';
import { useState, useEffect } from 'react';

export default function Recommendations() {
  const { user } = useUser();
  const [videos, setVideos] = useState<YouTubeResponse>({ items: [] });
  const { data: tuteeAppointments, error } = TableFetch<AppointmentQuery>("appointment", [user, "tutee"], `tutee_email_contains=${user?.email}`);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const loadingAppointments = !tuteeAppointments && !error;

  useEffect(() => {
      if (tuteeAppointments) {
        // Extract subjects from appointments
        const extractedSubjects = tuteeAppointments.data
          .map(appointment => appointment.tuteeRequestComment)
          .filter(subject => subject && subject.trim() !== '');
        setSubjects(extractedSubjects);

        const fetchVideos = async () => {
          try {
            if (extractedSubjects.length > 0) {
              const mostRecentSubject = extractedSubjects[extractedSubjects.length - 1];
              const videos = await getYouTubeVideos(mostRecentSubject);
              setVideos(videos);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoadingVideos(false);
          }
        };
        fetchVideos();
      }
    }, [tuteeAppointments]);
 
  if (error) return <div>Error loading appointments</div>;
  const isLoading = loadingAppointments || loadingVideos;

  return (
    <Box pt={4} bgcolor="background.default">
      <Container maxWidth="lg">
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Videos recommended for you:
          </Typography>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
              <Grid container spacing={3}>
                {videos.items.map((video: Video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Grid>
                ))}
              </Grid>
            )}
        </Paper>
      </Container>
    </Box>
  );
}

