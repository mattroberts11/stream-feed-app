import { useState } from 'react';
// import { connect } from 'getstream';
import { Button, TextField } from '@mui/material';
import Activities from "./Activities";


const Feed = ({feedClient}) => {

  const [value, setValue] = useState('Create Your Post');

  // console.log("CLIENT IN FEED", client)

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  };

  const handleClick = () => {
    setValue('');
  };

  const activity = {
    'actor': `SU:${feedClient.userId}`,  
    'verb': 'post',
    'object': 'Post:11', 
    'text': value,
  };

  const createPost = async (event) => {
    event.preventDefault();
    await feedClient.addActivity(activity).then( r => console.log('ADD POST R', r));
  }

  

  return (
    <>
      { feedClient.userId ?
        <p>{`Hey ${feedClient.userId}!`}</p>
        : null
      }
      <form onSubmit={(event) => createPost(event)}>
        <TextField 
          id="outlined-multiline-flexible"
          label="Create Your Post"
          fullWidth
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          sx={{marginBottom: '2rem'}}
        />
        <Button variant="contained" size="large" onClick={createPost} sx={{marginBottom: '2rem'}}>Post</Button>
      </form>
      <Activities text={'My posts are going to go here'} />
    </>
  );
};

export default Feed;
