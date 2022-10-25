import React from 'react';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';

interface ISummaryProps {
  basicInfo: {
    firstName: string;
    lastName: string;
    sports: string[];
    gender: string;
    dob: Date;
  };
  about: {
    interests: string;
    location: string;
    team: string;
  };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Summary (props: ISummaryProps) {
  const handleSubmit = async () => {
    try {
      const body = {
        ...props.basicInfo,
        ...props.about
      };
      await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify(body)
      });
      props.setPage(props.page + 1);
    } catch (error) {
      console.log(`Error in Submit button: ${error}`)
    }
    
  };

  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center'}} variant="h4" >Summary</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 10, margin: 4, gap: 2, border: '1px solid #034f84', borderRadius: 2}}>
        <Box>
          <Typography sx={{ textAlign: 'center'}}>Basic Information</Typography>
          <Typography>Name: {`${props.basicInfo.firstName} ${props.basicInfo.lastName}`}</Typography>
          <Typography>Sports: {props.basicInfo.sports.join(', ')}</Typography>
          <Typography>Gender: {props.basicInfo.gender}</Typography>
          <Typography>DOB: {props.basicInfo.dob.toLocaleString().split(',')[0]}</Typography>
          <Button onClick={() => props.setPage(0)} variant="outlined">Edit</Button>
        </Box>
        <Box>
          <Typography sx={{ textAlign: 'center'}}>About</Typography>
          <Typography>Interests: {props.about.interests}</Typography>
          <Typography>Location: {props.about.location}</Typography>
          <Typography>Team: {props.about.team}</Typography>
          <Button onClick={() => props.setPage(1)} variant="outlined">Edit</Button>
        </Box>
      </Box>
      <Button sx={{ position: 'absolute', bottom: 0, left: 0}} variant="contained" onClick={() => props.setPage(props.page - 1)} >Back</Button>
      <Button sx={{ position: 'absolute', bottom: 0, right: 0}} variant="contained" onClick={handleSubmit} >Submit</Button>
    </Box>
  );
}

export default Summary;
