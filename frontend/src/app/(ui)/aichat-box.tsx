'use client';

import React, { useState, useRef } from 'react';
import {Box, Divider, Drawer, IconButton, InputAdornment, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {ArrowBackIos, Send, Campaign} from "@mui/icons-material";

import {AIChatRequest} from '@/app/_lib/utils';


interface AIChatBoxProps {
    isChatOpen: boolean;
    handleChatClose: () => void;
}

export default function AIChatBox( {isChatOpen, handleChatClose} : AIChatBoxProps) {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState<{ content: string; role: string; }[]>([]);
    const utteranceRef = useRef<SpeechSynthesisUtterance| null>(null);
    const [aiChatResponse, setaiChatResponse] = useState('');

    const textToSpeech = () => {
        const utterance = new SpeechSynthesisUtterance(aiChatResponse);
        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
    };

    const sendMessage = async () => {
        setConversation(prevConversation => [...prevConversation, {role: 'user', content: message}]);

        try {
            const prompt = 'You are a helpful assistant.';
            const aiResponse = await AIChatRequest(message, prompt);

            setConversation(prevConversation => [...prevConversation, {
                role: 'ai',
                content: aiResponse
            }]);
            setaiChatResponse(aiResponse);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setMessage('');
        }
    };

    return (
        <Drawer anchor="right" open={isChatOpen} onClose={handleChatClose}>
            <Box sx={{width: 300, p: 2, display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton sx={{color: 'black'}} aria-label="backarrow" onClick={handleChatClose}>
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
                                    <IconButton sx={{color: 'black'}}>
                                        <Campaign onClick={textToSpeech}/>
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
