import { Button, TextField } from '@mui/material';


const TopNav = ({createFeed, handleCreateUser}) => {


  return (
    <>
    <form onSubmit={(event) => createFeed(event)}>
      <TextField
        name="userId" 
        label="Enter a Username"  
        type="text"  
        onChange={handleCreateUser} 
        sx={{marginBottom: '1rem'}}
      />
      <div>
        <Button variant="contained" size="large"  onClick={createFeed} sx={{marginBottom: '1rem'}}>Create My Feed</Button>
      </div>
      </form>
    </>
  );
};

export default TopNav;

