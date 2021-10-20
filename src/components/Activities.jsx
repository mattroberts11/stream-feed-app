import { Paper, Stack } from '@mui/material';


const Activities = ({text}) => {

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      {/* map through here */}
      <Paper sx={{padding: '0.5rem'}}>
        {text}
      </Paper>
    </Stack>
  );
};

export default Activities;