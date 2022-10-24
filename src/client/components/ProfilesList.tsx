import React from 'react';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';

interface IProfilesListProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function ProfilesList (props: IProfilesListProps) {
  const [profiles, setProfiles] = React.useState([]);

  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await (await fetch('/api')).json();
        console.log(profiles)
      } catch (error) {
        console.log(`Error in fetchProfiles in ProfilesList component: ${error}`)
      }
    };
    fetchProfiles();
  }, []);

  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center' }} variant="h3" >List of Profiles</Typography>
      <Button sx={{ position: 'absolute', bottom: 0, left: 50 }} variant="contained" onClick={() => props.setPage(0)} >Create new profile</Button>
    </Box>
  );
}

export default ProfilesList;
