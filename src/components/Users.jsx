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

  const handleDelete = async (id) => {
    await timelineClient.unfollow('user', id)
      .then( (r) => console.log('UNFOLLOW RESPONSE', r))
  }


  return (
    <div>
      
      <Button onClick={() => handleClick('will')}>Will</Button>
      <Chip label="unfollow" variant="outlined" onDelete={() => handleDelete('will')} >unfollow</Chip>
      
     
      <Button onClick={() => handleClick('katy')}>Katy</Button>
      <Chip label="unfollow" variant="outlined" onDelete={() => handleDelete('katy')} >unfollow</Chip>
    </div>
  )
}

export default Users;