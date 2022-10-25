import React from 'react';
import { Box } from '@mui/system';
import Form from './components/Form';
import { Typography } from '@mui/material';

function App() {
  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: '#034f84'
  }

  return (
    <Box sx={boxStyle}>
      <Typography variant="h3" color="white">OpenSponsorship Athlete Form</Typography>
      <Form />
    </Box>
  );
}

export default App;
