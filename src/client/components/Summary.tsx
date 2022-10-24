import React from 'react';
import { Box } from '@mui/system';
import { Dayjs } from 'dayjs';
import { Typography, Button } from '@mui/material';

interface ISummaryProps {
  basicInfo: {
    firstName: string;
    lastName: string;
    sports: string[];
    gender: string;
    dob: Dayjs;
  };
  about: {
    description: string;
    location: string;
    team: string;
  };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Summary (props: ISummaryProps) {
  const handleSubmit = () => {
    props.setPage(props.page + 1);
  }

  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center'}} variant="h3" >Summary</Typography>
      <Button sx={{ position: 'absolute', bottom: 0, left: 0}} variant="contained" onClick={() => props.setPage(props.page - 1)} >Back</Button>
      <Button sx={{ position: 'absolute', bottom: 0, right: 0}} variant="contained" onClick={handleSubmit} >Submit</Button>
    </Box>
  );
}

export default Summary;
