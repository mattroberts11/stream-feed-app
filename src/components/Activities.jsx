import {Avatar, Divider, Paper, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'getstream';


const Activities = ({activities, client, feedType, followerId, token}) => {

  const [commentText, setCommentText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [likeTargetFeeds, setLikeTargetFeeds] = useState([]);
  const [value, setValue] = useState('Comment on post');

// console.log("followerId", followerId)

  const api_key = process.env.REACT_APP_API_KEY;
  const app_id = process.env.REACT_APP_APP_ID;

  const activitiesClient = connect(api_key, token, app_id);

  // const commentDropdowns = querySelectorAll(div.card-comments-container);
  // next add event listener to each one for click
  // when clicked add class show

  const createTargetFeedsObj = () => {
    let targetedFeeds = [];
    followerId.forEach( follower => {
      targetedFeeds.push(`notifications:${follower}`)
    })
    setLikeTargetFeeds(targetedFeeds);
  }

  const likePost = async (postId) => {
  //   // console.log('LIKE POSTID', postId)
  //   // console.log("LIKE POST CLIENT", client)

  // use actor id in results array to add username after the notifications 
  // make sure to get unique
    await client.client.reactions.add('like', postId, {targetFeeds: likeTargetFeeds})
      .then( r => console.log('Like Post Response===', r))
  }

  const toggleShowInput = () => {
    setShowInput(!showInput);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleCommentFormClick = () => {
    setValue('');
  }

  const commentOnPost = async (event, postId) => {
    event.preventDefault();
    await client.client.add('comment', postId, {text: value})
      .then( r => console.log('Add Comment Response', r))
      .finally(setValue('Comment on post'))
    }

  // console.log('target feeds', likeTargetFeeds);
  useEffect( () => {
    setLikeTargetFeeds([]);
    if((feedType === 'timeline' || feedType === 'global') && followerId){
      
      createTargetFeedsObj();
    }
  }, [])

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
            <Paper 
              key={`activity-${activity.id}`} 
              sx={{padding: '0.5rem'}} 
              elevation={3}
              id={`activity-${i}`}
            >
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
                <div className='card-likes' onClick={() => likePost(activity.id)}>Likes</div>
                <div className={`card-comments-link`} data-id={activity.id} onClick={toggleShowInput}>Comments</div>
              </div>
              <div id={`dropdown-${i}`} className={`card-comments-container ${showInput ? 'show' : 'hide'}`}>
                <Divider sx={{marginBottom: '.5rem'}} />
                <form onSubmit={(event) => commentOnPost(event, activity.id)}>
                  <TextField 
                    id={`input-${i}`}
                    
                    variant='outlined' 
                    fullWidth 
                    label='Add A Comment'
                    onChange={handleChange}
                    onClick={handleCommentFormClick}
                    value={value}
                    sx={{marginBottom: '.5rem'}}
                  />
                </form>
                <div className={`card-comments`}>
                  {/* if comment show it here */}
                    Comments here...
                </div>
              </div>
            </Paper>
          )
        })
      }
    </Stack>
  );
};

export default Activities;