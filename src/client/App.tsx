import React from 'react';
import { Box } from '@mui/system';
import Form from './components/Form';

function App() {
  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: '#034f84'
  }

  return (
    <Box sx={boxStyle}>
      <Form />
    </Box>
  );
}

export default App;
