'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Divider, Stack, Drawer, TextField, List, ListItem, ListItemText }
  from '@mui/material'
import { Login, HowToReg, Chat }
  from '@mui/icons-material'
import ResponsiveAppBar from './(ui)/app-bar'
import axios from 'axios';

const links = [
  {name: 'Login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
  {name: 'Chat with AI', href: '/ai-chat', icon: Chat},
];

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ text: string; sender: string; }[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendMessage = async () => {
    setConversation([...conversation, { text: message, sender: 'user' }]);
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 60,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    setConversation([...conversation, { text: response.data.choices[0].text, sender: 'ai' }]);
    setMessage('');
  };

  return (
    <>
      <header>
        <ResponsiveAppBar links={links} settings={[]} />
        <Button onClick={handleOpen}>Chat with AI</Button>
      </header>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {conversation.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={message.text} secondary={message.sender} />
              </ListItem>
            ))}
          </List>
          <TextField value={message} onChange={e => setMessage(e.target.value)} />
          <Button onClick={sendMessage}>Send</Button>
        </Box>
      </Drawer>
      <main>
        <Stack direction="column" width="100%" height="100%" spacing={8} alignItems="center">
          <Stack bgcolor="#e0e0e0" width="100%" sx={{ flexDirection: {xs: "column", md: "row"} }} justifyContent="center" alignItems="center" p={4} spacing={4}>
            <Stack direction="column" textAlign="left" pr={4} spacing={4}>
              <Stack direction="column" display="inline">
                <Typography color='secondary' variant="h3" fontWeight="bold" display="inline">
                  Find Peer Tutors With Experience In 
                </Typography>
                <Typography color='primary' variant="h3" fontWeight="bold" display="inline">
                  &nbsp;Your Course
                </Typography>
                <Typography  color='secondary' variant="h3" fontWeight="bold" display="inline">
                  .
                </Typography>
              </Stack>

              <Button variant="contained" color="tertiary" LinkComponent={Link} href="/register" sx={{ width: 150 }}>
                <Typography color='primary' variant="h6">
                  Sign Up
                </Typography>
              </Button>
            </Stack>
            
            <img src="/landingpage.png" alt="Your Image" width={600} height={400} />
          </Stack>

          <Divider variant="middle" orientation="horizontal" sx={{ width: '75%' }} /> 

          <Box width="50%" mx="auto" textAlign="center" pb={4}> 
            <Typography align="center" mt={2} sx={{ fontSize: '40px', fontWeight: 'bold'}}> 
              Our Mission
            </Typography>

            <Typography variant="h5" align="center" mt={2} sx={{ fontWeight: 'bold'}}> 
              Theo is an online tutoring marketplace within university domains where students can turn subject matter expertise into a side hustle. 
            </Typography>

            <Typography variant="h5" align="center" mt={2} sx={{ fontWeight: 'bold'}}> 
              By handling bookings and scheduling on their behalf, the tool allows enrolled tutors to focus on teaching while getting discovered by relevant tutees seeking specific course guidance. 
            </Typography>
          </Box>
        </Stack>
      </main>
    </>
  );
}
