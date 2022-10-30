import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';

interface IProfileProps {
  _id: string;
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
  setEditProfileCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

function Profile(props: IProfileProps) {
  const [deleteCheck, setDeleteCheck] = React.useState(false);

  const handleEditProfile = () => {
    props.setEditProfileCheck(true);
    props.setPage(0);
  }

  const handleDeleteProfile = async () => {
    try {
      await fetch(`/api/${props._id}`, { method: 'DELETE' });
      props.setPage(3);
    } catch (error) {
      console.log(`Error in handleDeleteProfile: ${error}`)
    }
  }

  const handleDisplayProfile = () => {
    if (!deleteCheck) {
      return (
        <Box sx={{ position: 'relative', height: 1 }}>
          <Typography sx={{ textAlign: 'center' }} variant="h3" >Selected Profile</Typography>
          <Box sx={{ padding: 10, margin: 4 }}>
            <Typography>Name: {`${props.basicInfo.firstName} ${props.basicInfo.lastName}`}</Typography>
            <Typography>Sports: {props.basicInfo.sports.join(', ')}</Typography>
            <Typography>Gender: {props.basicInfo.gender}</Typography>
            <Typography>DOB: {props.basicInfo.dob.toLocaleString().split(',')[0]}</Typography>
            <Typography>Interests: {props.about.interests}</Typography>
            <Typography>Location: {props.about.location}</Typography>
            <Typography>Team: {props.about.team}</Typography>
            <Button sx={{ float: 'right', backgroundColor: 'red' }} variant="contained" onClick={() => setDeleteCheck(true)}>Delete profile</Button>
          </Box>
          <Button sx={{ position: 'absolute', bottom: 0, left: 0 }} variant="contained" onClick={() => props.setPage(3)} >List of profiles</Button>
          <Button sx={{ position: 'absolute', bottom: 0, right: 0 }} variant="contained" onClick={handleEditProfile} >Edit Profile</Button>
        </Box>
      );
    }
    else {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 1 }}>
          <Typography>Are you sure you want to delete this profile?</Typography>
          <Box sx={{ padding: 5 }}>
            <Button onClick={() => setDeleteCheck(false)} variant="contained">Go Back to profile</Button>
            <Button sx={{ marginLeft: 5, backgroundColor: 'red' }} onClick={handleDeleteProfile} variant="contained">Yes</Button>
          </Box>
        </Box>
      )
    }
  }

  return (
    handleDisplayProfile()
  );
}

export default Profile;
