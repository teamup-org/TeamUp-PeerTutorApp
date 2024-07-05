'use client';

import * as React from 'react';
import {Box, Divider, Drawer, IconButton, InputAdornment, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {ArrowBackIos, Send} from "@mui/icons-material";

//Try to add interface to definitions.d.ts
interface AIChatBoxProps {
    open: boolean;
    handleClose: () => void;
    conversation: { content:string, role: string}[];
    message: string;
    setMessage: (message:string) => void;
    sendMessage: () => void;
}

export default function AIChatBox({ open, handleClose, conversation, message, setMessage, sendMessage } : AIChatBoxProps) {
    return (
        <Drawer anchor="right" open={open} onClose={handleClose}>
            <Box sx={{width: 300, p: 2, display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton sx={{color: 'black'}} aria-label="backarrow" onClick={handleClose}>
                        <ArrowBackIos/>
                    </IconButton>
                    <Typography color='primary' variant="h6">AI Assistant</Typography>
                </Box>
                <Divider sx={{backgroundColor: 'lightgray'}}/>

                <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                    <List>
                        {conversation.map((message, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={message.content}
                                    sx={{
                                        p: 1,
                                        borderRadius: '20px',
                                        backgroundColor: message.role === 'user' ? 'black' : 'lightgray',
                                        color: message.role === 'user' ? 'white' : 'black',
                                        display: 'flex'
                                    }}
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
                        multiline
                        sx={{p: 1, borderRadius: '20px', flexGrow: 1}}
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
    );
}