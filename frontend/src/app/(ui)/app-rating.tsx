import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface AppRatingProps {
    open: boolean;
    onClose: () => void;
    userId: string;
}

const AppRating: React.FC<AppRatingProps> = ({ open, onClose, userId }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [showSurvey, setShowSurvey] = useState(false);
    const [form, setForm] = useState({
        likeMost: '',
        difficultFeatures: '',
        missingFeatures: '',
        schedulingNeeds: '',
        customerSupportRating: '',
        improveExperience: '',
        additionalFeatures: ''
    });

    useEffect(() => {
        // Check popup status
        const checkPopupStatus = async () => {
            try {
                const response = await fetch(`/user_feedback/popup_status?userId=${userId}`);
                const shouldShow = await response.json();
                setShowSurvey(shouldShow);
            } catch (error) {
                console.error("Failed to fetch popup status", error);
            }
        };

        checkPopupStatus();
    }, [userId]);

    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async () => {
        const feedback = {
            userId,
            rating: rating || 0,
            feedback1: form.likeMost,
            feedback2: form.difficultFeatures,
            feedback3: form.missingFeatures,
            feedback4: form.schedulingNeeds,
            feedback5: form.customerSupportRating,
            feedback6: form.improveExperience,
            feedback7: form.additionalFeatures
        };

        try {
            await fetch('/user_feedback/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedback)
            });
            onClose();
        } catch (error) {
            console.error("Failed to submit feedback", error);
        }
    };

    const handleSurveyContinue = () => {
        setShowSurvey(true);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Rate our app</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    {[...Array(5)].map((_, index) => (
                        <IconButton key={index} onClick={() => handleStarClick(index)}>
                            <StarIcon color={index < (rating || 0) ? 'primary' : 'disabled'} />
                        </IconButton>
                    ))}
                </div>
                {!showSurvey && (
                    <Typography variant="body2" color="primary" onClick={handleSurveyContinue} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        Continue to Short Survey
                    </Typography>
                )}
                {showSurvey && (
                    <>
                        <TextField
                            fullWidth
                            label="What do you like most about our tutor app?"
                            name="likeMost"
                            value={form.likeMost}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Are there any features you find difficult to use or understand?"
                            name="difficultFeatures"
                            value={form.difficultFeatures}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Are there any features you think are missing or could be improved?"
                            name="missingFeatures"
                            value={form.missingFeatures}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Are the scheduling and calendar features meeting your needs?"
                            name="schedulingNeeds"
                            value={form.schedulingNeeds}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="How would you rate the customer support provided within the app?"
                            name="customerSupportRating"
                            value={form.customerSupportRating}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="How can we improve your experience with our tutor app?"
                            name="improveExperience"
                            value={form.improveExperience}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="What additional features or improvements would you like to see in future updates?"
                            name="additionalFeatures"
                            value={form.additionalFeatures}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {showSurvey && <Button onClick={handleSubmit} color="primary">Submit</Button>}
                <Button onClick={onClose} color="secondary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppRating;
