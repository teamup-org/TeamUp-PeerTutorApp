import * as React from 'react';

import { useEffect }
  from 'react';

import { Typography }
  from '@mui/material';

/**
 * Component for transcript upload step of tutor registration
 * @param transcript - Tutor Transcript 
 * @returns 
 */
export function TranscriptUpload(
  {transcript: [transcript, setTranscript]}
  :
  {transcript: [Object | null, Function]}
) {
  
  // Makes sure transcript is empty everything page is refreshed
  useEffect(() => {
    setTranscript(null);  
  }, []);

  // Function for changing transcript
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Access the first file in the files array
      const file = files[0];
      setTranscript(file);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
    <Typography component="h2" variant="h5"> Please upload a pdf of your most current transcript </Typography>
    <form id="uploadForm">
      <div >
        <label>Select Transcript File: </label>
        <input type="file" accept=".pdf" onChange={handleFileChange} required/>
      </div>
    </form>
  </div>
  );
}