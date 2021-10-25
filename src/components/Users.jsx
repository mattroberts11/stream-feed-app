import { useEffect, useState } from "react";
import { Button, Chip, Stack } from "@mui/material";


const Users = ({timelineClient}) => {

  const [follow, setFollow] = useState(false);
  // onclick follow or unfollow
  
  
  const handleClick = async (id) => {
    console.log("user click!!!")
    await timelineClient.follow('user', id)
      .then( (r) => console.log('FOLLOW RESPONSE', r))
    // setFollow(!follow);
  }

  const handleUnfollow = async (id) => {
    await timelineClient.unfollow('user', id)
      .then( (r) => console.log('UNFOLLOW RESPONSE', r))
  }


  return (
    <Stack spacing={1}>
      <div>
        <Button size="small" variant="outlined" sx={{marginRight: '5px'}} onClick={() => handleClick('will')}>Follow Will</Button>
        <Chip label="unfollow" variant="outlined" onDelete={() => handleUnfollow('will')} >unfollow</Chip>
      </div>
      <div>
        <Button size="small" variant="outlined" sx={{marginRight: '5px'}} onClick={() => handleClick('katy')}>Follow Katy</Button>
        <Chip label="unfollow" variant="outlined" onDelete={() => handleUnfollow('katy')} >unfollow</Chip>
      </div>
      <div>
        <Button size="small" variant="outlined" sx={{marginRight: '5px'}} onClick={() => handleClick('matt')}>Follow Matt</Button>
        <Chip label="unfollow" variant="outlined" onDelete={() => handleUnfollow('matt')} >unfollow</Chip>
      </div>
    </Stack>
  )
}

export default Users;