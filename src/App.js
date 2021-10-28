import { useEffect, useState } from 'react';
import { connect } from 'getstream';
import axios from 'axios';
import { Container, CssBaseline, Divider, Grid, Paper } from '@mui/material';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import TimelineFeed from './components/TimelineFeed';
import GlobalFeed from './components/GlobalFeed';
import Users from './components/Users';
import './App.scss';

function App() {

  const api_key = process.env.REACT_APP_API_KEY;
  const app_id = process.env.REACT_APP_APP_ID;

  const [activities, setActivities] = useState();
  const [feedClient, setFeedClient] = useState();
  const [feedType, setFeedType] = useState('user');
  const [followers, setFollowers] = useState([]);
  const [followerId, setFollowerId] = useState([]);
  const [globalClient, setGlobalClient] = useState();
  const [timelineClient, setTimelineClient] = useState();
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  const client = connect(api_key, token, app_id); //constructor function

  const createFeed = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:5000/token', {
      user
    })

    setToken(response.data);  
  
    const userFeed = client.feed('user', user, response.data);
    const timelineFeed = client.feed('timeline', user, response.data);
    const globalFeed = client.feed('global', 'all', response.data);

    setFeedClient(userFeed);
    setTimelineClient(timelineFeed);
    setGlobalClient(globalFeed);
  }

  const handleCreateUser = (event) => {
    setUser(event.target.value);
  }

  const getActivitiesForCurrentUser = () => {
    feedClient.get({limit:10}).then( r => setActivities(r.results))
  }

  const getFollowers =  async () => {
    await feedClient.followers({limit: '10'})
    //  .then( r => console.log('FOLLOWERS', r))
     .then( r => setFollowers(r.results))
    //  .finally(getFollowersId())
 }

  const getFollowersId = () => {
    let fId = []
    followers.forEach( (follower) => {
      console.log('FOLLOWER', follower)
      fId.push(follower.feed_id.replace('timeline:', ''));
    })
    setFollowerId(fId);
  }

  useEffect( () => {
    if(followers){
      getFollowersId();
    }
  }, [followers])

  useEffect(() => {
    if(feedClient) {
      getActivitiesForCurrentUser();
      getFollowers();
      // getFollowersId();
    }
  },[feedClient])

  return (
    
    <CssBaseline>
      <Container sx={{marginTop: '1rem'}}>
        <Paper variant="outlined">
          <Grid container sx={{marginTop: '1rem', padding: '1rem'}}>
            <Grid item xs={12} sx={{padding: '1rem'}}> 
              <TopNav createFeed={createFeed} handleCreateUser={handleCreateUser} setToken={setToken}/>
              <Divider />
            </Grid>
            { feedClient?.userId ?
              <>
                <Grid item xs={3} sx={{marginTop: '1rem'}}>
                  <Paper  elevation={3}>
                    <Sidebar feedType={feedType} setFeedType={setFeedType} />
                  </Paper>
                </Grid>
                <Grid item xs={6} sx={{padding: '1rem'}}>
                  
                  {
                    feedType === 'user' ?  
                    <Feed 
                      activities={activities}
                      feedClient={feedClient} 
                      feedType={feedType}
                      user={user}
                    />
                    : feedType === 'timeline' ?
                    <TimelineFeed 
                      timelineClient={timelineClient}
                      feedType={feedType}
                      followers={followers}
                      user={user}
                    />
                    : feedType === 'global' ?
                    <GlobalFeed 
                      globalClient={globalClient}
                      feedType={feedType}
                      followers={followers}
                      user={user}
                    />
                    : null
                  }
                
                </Grid>
                <Grid item xs={3} sx={{marginTop: '1rem'}}>
                  <Paper elevation={3} sx={{padding: '0.5rem'}}>
                    <Users timelineClient={timelineClient} followerId={followerId} />
                  </Paper>
                </Grid>
                </>
                : <p>Create a username in the form above.</p>
                
            }
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
    
  );
}

export default App;
