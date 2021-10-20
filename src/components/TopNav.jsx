import { useState } from 'react';
import { Button, TextField } from '@mui/material';


const TopNav = () => {

  const handleChange = () => {

  }

  const handleClick = () => {

  }

  return (
    <>
      <TextField
        name="userId" 
        label="Create Username"  
        type="text"  
        onChange={(e) => handleChange(e)} 
        sx={{marginBottom: '10px'}}
      />
      <div>
        <Button variant="contained" size="large"  onClick={handleClick}>Join Feed!</Button>
      </div>
    </>
  );
};

export default TopNav;

