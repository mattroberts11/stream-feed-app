import {Avatar, Divider, Input, Paper, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'getstream';


const Activities = ({activities, client, feedType, followerId, token}) => {

  const [commentText, setCommentText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [likeTargetFeeds, setLikeTargetFeeds] = useState([]);
  const [value, setValue] = useState('Comment on post');


// console.log("ACTIVITIES FEED TYPE", feedType);
// console.log("ACTIVITIES CLIENT", client);
console.log("ACTIVITIES", activities);

  // const api_key = process.env.REACT_APP_API_KEY;
  // const app_id = process.env.REACT_APP_APP_ID;

  // const activitiesClient = connect(api_key, token, app_id);

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
    await client.client.reactions.add('like', postId, {targetFeeds: likeTargetFeeds})
      .then( r => console.log('Like Post Response===', r))
  }

  const toggleShowInput = () => {
    setShowInput(!showInput);
  }

  const handleChange = (event, id) => {
    console.log('EVENT', event);
    console.log('id', id);
    console.log('TARGET VALUE', event.target.value);
    // const inputValue = document.querySelector(id).value;
    console.log('QUERY SELECTOR', document.querySelector(id));
    // console.log('INPUT VALUE', inputValue);
    setValue(event.target.value);
  }

  const handleCommentFormClick = () => {
    setValue('');
  }

  const commentOnPost = async (event, postId) => {
    event.preventDefault();
    console.log('COMMENT FORM TEXT', value);
    // await client.client.add('comment', postId, {text: event.target.value})
    //   .then( r => console.log('Add Comment Response', r))
      // .finally(setValue('Comment on post'))
    }

  // console.log('target feeds', likeTargetFeeds);
  useEffect( () => {
    setLikeTargetFeeds([]);
    
    if((feedType === 'timeline' || feedType === 'global') && followerId){
      createTargetFeedsObj();
    }
  }, [])

  // useEffect( () => {
  //   const commentContainer = document.querySelector("#feed-container");
  //   const commentForms = commentContainer.querySelectorAll("input");
      
  //   console.log("commentForms", commentForms);

  //   commentForms.forEach( (item, i) => {
  //     item.addEventListener('click', event => {
  //       handleChange(event);
  //     })
  //   })
  // })
// activites.ownReactions has a like
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
            <>
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
              {activity.own_reactions?.like 
                ?
                  <div className='card-likes' onClick={() => likePost(activity.id)}>Like</div> 
                :
                  <div className='card-likes liked'>Liked</div>
              }
                {/* <div className={`card-comments-link`} data-id={activity.id} onClick={toggleShowInput}>Comments</div> */}
                <div className={`card-comments-link`} data-id={activity.id} >Comments</div>
              </div>
              {/* <div id={`dropdown-${i}`} className={`card-comments-container ${showInput ? 'show' : 'hide'}`}> */}
              <div id={`dropdown-${i}`} className={`card-comments-container`}>
                <Divider sx={{marginBottom: '.5rem'}} />
                <form onSubmit={(event) => commentOnPost(event, activity.id)}>
                  {/* <TextField 
                    id={`input-${i}`}
                    className='comment-field'
                    variant='outlined' 
                    fullWidth 
                    label='Add A Comment'
                    onChange={ (event) => handleChange(event, `input-${i}`)}
                    onClick={handleCommentFormClick}
                    // value={value}
                    sx={{marginBottom: '.5rem'}}
                  /> */}
                  <input  
                    type="text" id={`input-${i}`} 
                    onChange={ (event) => handleChange(event, `input-${i}`)}
                    onClick={() => this.value=''}
                    value="Create a post"
                    // ref={`input-${i}`} 
                  />
                </form>
                <div className={`card-comments`}>
                  {/* if comment show it here */}
                    Comments here...
                </div>
              </div>
            </Paper>
            </>
          )
        })
      }
    </Stack>
  );
};

export default Activities;