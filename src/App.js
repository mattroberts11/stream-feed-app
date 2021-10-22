import { useState } from 'react';
import { connect } from 'getstream';
import axios from 'axios';
import { Container, CssBaseline, Divider, Grid, Paper } from '@mui/material';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import TimelineFeed from './components/TimelineFeed';
import GlobalFeed from './components/GlobalFeed';
import './App.css';

function App() {

  const api_key = process.env.REACT_APP_API_KEY;

  // console.log("API KEY", api_key);
  // const api_secret = process.env.REACT_APP_API_SECRET;
  const app_id = process.env.REACT_APP_APP_ID;

  const [feedType, setFeedType] = useState('My');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState();
  const [feedClient, setFeedClient] = useState({});

  // console.log('FEED TYPE', feedType);

  const client = connect(api_key, token, app_id);

  const createFeed = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:5000/token', {
      user
    })

    setToken(response.data);

    const feed = client.feed('user', user, response.data);
    // console.log('RESPONSE', response.data);
    console.log('FEED', feed);
    setFeedClient(feed);
  }

  

  const handleCreateUser = (event) => {
    setUser(event.target.value);
    // setFeedType('My');
  }

  return (
    
    <CssBaseline>
      <Container sx={{marginTop: '1rem'}}>
        <Paper variant="outlined">
          <Grid container sx={{marginTop: '1rem', padding: '1rem'}}>
            <Grid item xs={12} sx={{padding: '1rem'}}> 
              <TopNav createFeed={createFeed} handleCreateUser={handleCreateUser} setToken={setToken}/>
              <Divider />
            </Grid>
            { feedClient.userId ?
              <>
                <Grid item xs={3} sx={{marginTop: '1rem'}}>
                  <Paper  elevation={3}>
                    <Sidebar feedType={feedType} setFeedType={setFeedType} />
                  </Paper>
                </Grid>
                <Grid item xs={6} sx={{padding: '1rem'}}>
                  
                  {
                    feedType === 'My' ?  
                    <Feed feedClient={feedClient} client={client}/>
                    : feedType === 'Timeline' ?
                    <TimelineFeed feedClient={feedClient}/>
                    : feedType === 'Global' ?
                    <GlobalFeed feedClient={feedClient} />
                    : null
                  }
                
                </Grid>
                <Grid item xs={3} sx={{marginTop: '1rem'}}>
                  <Paper elevation={3} sx={{padding: '1rem'}}>
                    Users?
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
