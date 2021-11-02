import { useState } from 'react';
import { Button, TextField } from '@mui/material';
// import Activities from "./Activities";

const PostForm = ({activities, feedClient, feedType, user}) => {

  const [value, setValue] = useState('Create Your Post');

  const handleChange = (event) => {
    setValue(event.target.value)
  };

  const handleClick = () => {
    setValue('');
  };

  const createPost = async (event) => {
    const activity = {
      'actor': `SU:${feedClient.userId}`,  
      'verb': 'post',
      'object': 'Post:11', 
      'text': value,
      'to': ['global:all'],
    };
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
      
    </>
  );
};

export default PostForm;
