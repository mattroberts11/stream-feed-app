import { useState } from 'react';
import { TextareaAutosize } from '@mui/material';
import Activities from "./Activities";


const Feed = () => {
  return (
    <>
      <h2>Feed</h2>
      <TextareaAutosize />
      <Activities text={'My posts are going to go here'} />
    </>
  );
};

export default Feed;