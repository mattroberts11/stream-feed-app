import {Avatar, Divider, Paper, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';


const Activities = ({feedClient}) => {

  const [activities, setActivities] = useState();

  const getActivitiesForCurrentUser = () => {
    feedClient.get({limit:10}).then( r => setActivities(r.results))
    // feedClient.get({limit:10}).then( r => console.log(r.results))
    console.log(activities)
  }
// console.log('ACTIVITIES FEED CLIENT', feedClient)
  useEffect(() => {
    getActivitiesForCurrentUser();
  },[feedClient])

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      
      { activities && 
        activities.map( (activity, i) => {
          let currTime = moment(activity.time).local();
          return (
            <Paper key={`activity-${activity.id}`} sx={{padding: '0.5rem'}} elevation={3}>
              <div className='card-row'>
                <div className='card-user'>
                  <Avatar sx={{bgcolor: '#1976d2'}}>{activity.actor.id.charAt(0)}</Avatar>
                  <div className='name'>{activity.actor.id}</div>
                </div>
                <div className='card-time'>{currTime.format('MMM Do YYYY, h:mm a')}</div>
              </div>
              <Divider />
              <div className='card-text'>
                {activity.text}
              </div>
              <div className='card-row'>
                <div className='card-likes'>Likes</div>
                <div className='card-comments'>Comments</div>
              </div>
            </Paper>
          )
        })
        
      }
     
    </Stack>
  );
};

export default Activities;