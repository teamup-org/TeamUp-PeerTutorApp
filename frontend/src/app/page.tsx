'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Divider, Stack, Drawer, TextField, List, ListItem, ListItemText, Fab, IconButton, InputAdornment}
  from '@mui/material'
import { Login, HowToReg, Chat, ArrowBackIos, Send}
  from '@mui/icons-material'
import ResponsiveAppBar from './(ui)/app-bar'
import axios from 'axios';
import {convertFieldResponseIntoMuiTextFieldProps} from "@mui/x-date-pickers/internals";

const links = [
  {name: 'Login', href: '/login', icon: Login},
  {name: 'Register', href: '/register', icon: HowToReg},
];

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ content: string; role: string; }[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendMessage = async () => {
    setConversation([...conversation, { role: 'user', content: message }]);
    const messageLength = message.length;
    console.log("Sending message of length (tokens):", messageLength);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.'},
          { role: 'user', content: message},
        ],
        max_tokens: 60,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer **Change this for API Key`,
        },
      });
      console.log("Received response:", response.data);
      setConversation([...conversation, {role: 'ai', content: response.data.choices[0].message.content}]);
    } catch (error) {
      console.log("Caught Error");
      console.error(error);
    } finally {
      setMessage('');
    }
  };

  return (
      <>
        <header>
          <ResponsiveAppBar links={links} settings={[]} />
        </header>
        <Drawer anchor="right" open={open} onClose={handleClose}>
          <Box sx={{ width: 300, p: 2, display: 'flex', flexDirection:'column', height: '100vh' }}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <IconButton sx={{color: 'black'}} aria-label="backarrow" onClick={handleClose}>
                <ArrowBackIos/>
              </IconButton>
              <Typography color='primary' variant="h6">AI Assistant</Typography>
            </Box>
            <Divider sx={{backgroundColor: 'lightgray'}}/>

            <Box sx={{ flexGrow:1, overflowY: 'auto', minHeight:0}}>
              <List>
                {conversation.map((message, index) => (
                    <ListItem key={index}>
                      <ListItemText
                          primary={message.content}
                          secondary={message.role}
                          sx={{p: 1, borderRadius: '20px', backgroundColor: message.role ==='user' ? 'black' : 'lightgray', color: message.role === 'user' ? 'white' : 'black', display: 'flex'}}
                      />
                    </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{display: 'flex', mt: 'auto', alignItems: 'flex-end'}}>
              <TextField
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={"Message..."}
                  sx={{p:1, borderRadius: '20px', flexGrow:1}}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                          <IconButton sx={{color: 'black'}}>
                            <Send onClick={sendMessage}/>
                          </IconButton>
                        </InputAdornment>
                    ),
                  }}
              />
            </Box>
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
        <Fab color="primary" aria-label="chat" onClick={handleOpen} sx={{ position: 'fixed', bottom: 16, right: 16,}}>
          <Chat />
        </Fab>
      </>
  );
}
