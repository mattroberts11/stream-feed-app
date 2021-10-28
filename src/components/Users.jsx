import { useEffect, useState } from "react";
import { Box, Button, Chip, Stack } from "@mui/material";

const Users = ({timelineClient, followerId}) => {

  const handleFollow = async (id) => {
    await timelineClient.follow('user', id)
      .then( (r) => console.log('FOLLOW RESPONSE', r))
  }

  const handleUnfollow = async (id) => {
    await timelineClient.unfollow('user', id)
      .then( (r) => console.log('UNFOLLOW RESPONSE', r))
  }
  
  return (
    <>
    <Stack spacing={1}>
      <Box>
        <Button size="small" variant="outlined" sx={{marginRight: '5px'}} onClick={() => handleFollow('will')}>Follow Will</Button>
        <Chip label="unfollow" variant="outlined" onDelete={() => handleUnfollow('will')} />
      </Box>
      <Box>
        <Button size="small" variant="outlined" sx={{marginRight: '5px'}} onClick={() => handleFollow('katy')}>Follow Katy</Button>
        <Chip label="unfollow" variant="outlined" onDelete={() => handleUnfollow('katy')} />
      </Box>
      <Box>
        <Button size="small" variant="outlined" sx={{marginRight: '5px'}} onClick={() => handleFollow('matt')}>Follow Matt</Button>
        <Chip label="unfollow" variant="outlined" onDelete={() => handleUnfollow('matt')} />
      </Box>
    </Stack>
    {followerId.length ?
      <>
      <h2>{`You have ${followerId.length} followers`}</h2>
      <ul>
        {followerId &&
        followerId.map( (id, i) => (
            <li key={`${id}-${i}`}>{id}</li>
          ))
        }
      </ul>
      </>
      : <p>You don't have any followers</p>
    }
    </>
  )
}

export default Users;
