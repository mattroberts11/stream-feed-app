import { useState } from 'react';
import { Container, CssBaseline, Grid } from '@mui/material';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import TimelineFeed from './components/TimelineFeed';
import GlobalFeed from './components/GlobalFeed';

import './App.css';

function App() {

  const [feedType, setFeedType] = useState('my');

  console.log('FEED TYPE', feedType);

  return (
    
    <CssBaseline>
      <Container>
        
          <Grid container sx={{border: '3px solid green', marginTop: '1rem'}}>
            <Grid item xs={12} sx={{padding: '1rem'}}> 
              <TopNav />
            </Grid>
            <Grid item xs={3} sx={{border: '1px solid blue'}}>
              <Sidebar feedType={feedType} setFeedType={setFeedType} />
            </Grid>
            <Grid item xs={6} sx={{border: '1px solid blue', padding: '1rem'}}>
              {
                feedType === 'My' ?  
                <Feed />
                : feedType === 'Timeline' ?
                <TimelineFeed />
                : feedType === 'Global' ?
                <GlobalFeed />
                : null
              }
              
            </Grid>
            <Grid item xs={3} sx={{border: '1px solid blue'}}>
              Users?
            </Grid>
          </Grid>
        
      </Container>
    </CssBaseline>
    
  );
}

export default App;
