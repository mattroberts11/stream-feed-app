import { useEffect, useState } from "react";
import { Button } from "@mui/material";


const Users = ({timelineClient}) => {

  const [follow, setFollow] = useState(false);
  // onclick follow or unfollow
  
  
  const handleClick = async (id) => {
    console.log("user click!!!")
    await timelineClient.follow('user', id)
      .then( (r) => console.log('FOLLOW RESPONSE', r))
    // setFollow(!follow);
  }


  return (
    <ul>
      <li><Button onClick={() => handleClick('will')}>Will</Button></li>
      <li><Button onClick={() => handleClick('katy')}>Katy</Button></li>
    </ul>
  )
}

export default Users;