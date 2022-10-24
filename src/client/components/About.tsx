import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';

interface IAboutProps {
  about: {
    description: string;
    location: string;
    team: string;
  };
  setAbout: React.Dispatch<React.SetStateAction<{
    description: string;
    location: string;
    team: string;
  }>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function About (props: IAboutProps) {
  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center' }} variant="h4" >About</Typography>
      <Box>
        
      </Box>
      <Button sx={{ position: 'absolute', bottom: 0, left: 0}} variant="contained" onClick={() => props.setPage(props.page - 1)} >Back</Button>
      <Button sx={{ position: 'absolute', bottom: 0, right: 0}} variant="contained" onClick={() => props.setPage(props.page + 1)} >Next</Button>
    </Box>
  )
}

export default About;
