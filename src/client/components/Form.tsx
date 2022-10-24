import React from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/system';
import BasicInfo from './BasicInfo';
import About from './About';
import Summary from './Summary';
import Profile from './Profile';
import ProfilesList from './ProfilesList';

function Form() {
  const [page, setPage] = React.useState(0);
  const [basicInfo, setBasicInfo] = React.useState({
    firstName: '',
    lastName: '',
    sports: [] as string[],
    gender: '',
    dob: dayjs(new Date()),
  });
  const [about, setAbout] = React.useState({
    description: '',
    location: '',
    team: ''
  });

  const currentPage = () => {
    if (page === 0) return <BasicInfo basicInfo={basicInfo} setBasicInfo={setBasicInfo} page={page} setPage={setPage}/>;
    else if (page === 1) return <About about={about} setAbout={setAbout} page={page} setPage={setPage}/>;
    else if (page === 2) return <Summary basicInfo={basicInfo} about={about} page={page} setPage={setPage}/>;
    else if (page === 3) return <Profile basicInfo={basicInfo} about={about} page={page} setPage={setPage}/>;
    else return <ProfilesList setPage={setPage}/>;
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