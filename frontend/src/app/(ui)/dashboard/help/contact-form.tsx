import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import React from 'react'
import { useUser } from "@auth0/nextjs-auth0/client";

/**
 * @function React Component for the Contact Form. Sends POST request to contact-form-handler/route.ts
 * @returns 
 */

/**
 * @function React Component for Compose Message / Contact Form
 * @returns 
 */

export default function ContactForm() {
    const {user, error, isLoading} = useUser();

    const [name, setName] = useState<string>("")
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const [email, setEmail] = useState<string>("")
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    
    const [subject, setSubject] = useState<string>("")
    const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSubject(e.target.value);
    }

    const [message, setMessage] = useState<string>("")
    const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const [open, setOpen] = useState<boolean>(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const postData = async () => {
            const data = {
                name: name,
                email: email,
                subject: subject,
                message: message,
            }

            const response = await fetch("/api/contact-form-handler", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
        }
        postData().then((data) => {
            alert('Form successfully sent!');
        }).catch((error) => {
            alert('Error submitting form. Please try again later.');
            console.error('Error sending message.', error);
        });

        setSubject("")
        setMessage("")
    }

    useEffect(() => {
        if (user) {
            setEmail(user.email || '') 
            setName(user.name || '')
        }
    }, [user]);

    return (
        <React.Fragment>
            <Stack alignItems={'center'}>
                <Button variant="contained" size="large" onClick={handleClickOpen}>
                    Send us an email!
                </Button>
            </Stack>
            <Dialog open={open} onClose={handleClose} aria-labelledby="Contact Form" aria-describedby="Contact Form Description">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Email Us!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out every field before submitting. We will try to get back to you in a timely manner.
                        </DialogContentText>
                        <TextField required margin="dense" id="name" name="name" label="Your Name" type="string" fullWidth variant="standard" value={name} onChange={handleNameChange}/>
                        <TextField required margin="dense" id="email" name="email" label="Your Email Address" type="string" fullWidth variant="standard" value={email} onChange={handleEmailChange}/>
                        <TextField required margin="dense" id="subject" name="subject" label="Subject" type="string" fullWidth variant="standard" value={subject} onChange={handleSubjectChange}/>
                        <TextField required margin="dense" id="message" name="message" label="Message" type="string" fullWidth variant="standard" multiline rows="8" inputProps={{maxLength: 400}} value={message} onChange={handleMessageChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Stack width="100%">
                            <Button variant="contained" size="large" type="submit" onClick={handleClose} disabled={(name == "" || email == "" || subject == "" || message == "")}>Submit</Button>
                        </Stack>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}