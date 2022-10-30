import React from 'react';
import { Box } from '@mui/system';
import { Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';

interface IProfilesListProps {
  setProfileId: React.Dispatch<React.SetStateAction<string>>;
  setBasicInfo: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    sports: string[];
    gender: string;
    dob: Date;
  }>>;
  setAbout: React.Dispatch<React.SetStateAction<{
    interests: string;
    location: string;
    team: string;
  }>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface IProfile {
  _id: string;
  firstName: string;
  lastName: string;
  sports: string[];
  gender: string;
  dob: Date;
  location: string;
  team: string;
  interests: string;
}

function ProfilesList (props: IProfilesListProps) {
  const [profiles, setProfiles] = React.useState([]);

  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await (await fetch('/api')).json();
        console.log(profiles)
        setProfiles(profiles)
      } catch (error) {
        console.log(`Error in fetchProfiles in ProfilesList component: ${error}`)
      }
    };
    fetchProfiles();
  }, []);

  const handleCreateProfileButton = () => {
    props.setBasicInfo({
      firstName: '',
      lastName: '',
      sports: [] as string[],
      gender: '',
      dob: new Date(),
    });
    props.setAbout({
      interests: '',
      location: '',
      team: ''
    });
    props.setPage(0);
  };

  const handleClickedProfile = (profile: IProfile) => {
    props.setProfileId(profile._id);
    props.setBasicInfo({
      firstName: profile.firstName,
      lastName: profile.lastName,
      sports: profile.sports,
      gender: profile.gender,
      dob: new Date(profile.dob),
    });
    props.setAbout({
      interests: profile.interests,
      location: profile.location,
      team: profile.team
    });
    props.setPage(4);
  }

  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <Typography sx={{ textAlign: 'center' }} variant="h3" >List of Profiles</Typography>
      <Box sx={{ height: '75%', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Sport(s)</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Team</TableCell>
                <TableCell align="right">Interests</TableCell>
                <TableCell align="right">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profiles.map((row: IProfile) => (
                <TableRow
                  key={row.firstName + row.lastName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {<Link onClick={() => handleClickedProfile(row)}>{row.firstName} {row.lastName}</Link>}
                  </TableCell>
                  <TableCell align="right">{row.sports.join(', ')}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.team}</TableCell>
                  <TableCell align="right">{row.interests}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button sx={{ position: 'absolute', bottom: 0, left: 0 }} variant="contained" onClick={handleCreateProfileButton} >Create new profile</Button>
    </Box>
  );
}

export default ProfilesList;
