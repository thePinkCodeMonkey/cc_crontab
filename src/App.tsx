import Box from "@mui/material/Box"
import React from 'react';
import TextField from '@mui/material/TextField';
import validateCronInput from "./lib/validator";
import './App.css';

//TODO: consider capping input at 5?
function App() {
  const [str, setStr] = React.useState<String>("Blah");
  const [error, setError] = React.useState<boolean>(false);
  let updateStr = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStr(e.target.value)
    validateCronInput(e.target.value) ? setError(false) : setError(true)
  }
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
            <TextField
              error={error}
              id="outlined-basic" 
              label="cron pattern" 
              variant="outlined"
              onChange={updateStr} />
        </Box>
        {str} 
      </header>
    </div>
  );
}

export default App;
