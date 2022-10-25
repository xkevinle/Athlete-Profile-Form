import React from 'react';
import { Box } from '@mui/system';
import BasicInfo from './BasicInfo';
import About from './About';
import Summary from './Summary';
import Profile from './Profile';
import ProfilesList from './ProfilesList';

function Form() {
  const [profileId, setProfileId] = React.useState('');
  const [editProfileCheck, setEditProfileCheck] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [basicInfo, setBasicInfo] = React.useState({
    firstName: '',
    lastName: '',
    sports: [] as string[],
    gender: '',
    dob: new Date(),
  });
  const [about, setAbout] = React.useState({
    interests: '',
    location: '',
    team: ''
  });

  const currentPage = () => {
    if (page === 0) return <BasicInfo basicInfo={basicInfo} setBasicInfo={setBasicInfo} page={page} setPage={setPage}/>;
    else if (page === 1) return <About about={about} setAbout={setAbout} page={page} setPage={setPage}/>;
    else if (page === 2) return <Summary profileId={profileId} editProfileCheck={editProfileCheck} basicInfo={basicInfo} about={about} page={page} setPage={setPage}/>;
    else if (page === 3) return <ProfilesList setProfileId={setProfileId} setBasicInfo={setBasicInfo} setAbout={setAbout} setPage={setPage}/>;
    else return <Profile setEditProfileCheck={setEditProfileCheck} _id={profileId}  basicInfo={basicInfo} about={about} page={page} setPage={setPage}/>;
  };

  const boxStyle = {
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
    height: '66%',
    minWidth: '33%',
    maxWidth: '50%',
    borderRadius: 2,
    boxShadow: 5
  };

  return (
    <Box component="form" sx={boxStyle}>
      {currentPage()}
    </Box>
  );
}

export default Form;