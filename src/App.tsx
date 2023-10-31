import React from 'react';
import logo from './logo.svg';
import Box from "@mui/material/Box"
import TextField from '@mui/material/TextField';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
            <TextField id="outlined-basic" label="cron pattern" variant="outlined" />
        </Box>
      </header>
    </div>
  );
}

export default App;
