'use client';
import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { TableFetch } from '@/app/_lib/data';
import { Box, Container, Paper, Grid, Typography } from '@mui/material';
import { getYouTubeVideos, Video, YouTubeResponse } from '@/app/_lib/utils';
import { useState, useEffect } from 'react';

export default function RecommendationPage() {
  const { user } = useUser();
  const [videos, setVideos] = useState<YouTubeResponse>({ items: [] });
  const { data: tuteeAppointments, error } = TableFetch("appointment", [user, "tutee"], `tutee_email_contains=${user?.email}`);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getYouTubeVideos("coding");
        setVideos(videos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  if (error) return <div>Error loading appointments</div>;
  if (!tuteeAppointments) return <div>Loading...</div>;

  // Extract subjects from appointments
  const subjects = tuteeAppointments.data.map(appointment => appointment.tuteeRequestComment).filter(subject => subject && subject.trim() !== '');

  return (
    <Box position="static" p={4}>
      <Container maxWidth="lg" sx={{ minWidth: 750 }}>
        <Paper variant="outlined" sx={{ px: 4, pb: 4 }}>
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
        </Paper>
      </Container>
    </Box>
  );
}
