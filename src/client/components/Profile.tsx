import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';

interface IProfileProps {
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

function Profile (props: IProfileProps) {
  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center' }} variant="h3" >Your Profile</Typography>
      <Button sx={{ position: 'absolute', bottom: 0, left: 0}} variant="contained" onClick={() => props.setPage(0)} >Create new profile</Button>
      <Button sx={{ position: 'absolute', bottom: 0, right: 0}} variant="contained" onClick={() => props.setPage(props.page + 1)} >List of profiles</Button>
    </Box>
  );
}

export default Profile;
