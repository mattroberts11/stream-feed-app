import { Container, CssBaseline, Grid } from '@mui/material';
import Feed from './Feed';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

import './App.css';

function App() {
  return (
    
    <CssBaseline>
      <Container>
        
          <Grid container sx={{border: '3px solid green', marginTop: '1rem'}}>
            <Grid item xs={12} sx={{padding: '1rem'}}> 
              <TopNav />
            </Grid>
            <Grid item xs={4} sx={{border: '1px solid blue'}}>
              <Sidebar />
            </Grid>
            <Grid item xs={8} sx={{border: '1px solid blue', padding: '1rem'}}>
              {/* conditional render => My Feed, Timeline, Global feed */}
              <Feed />
            </Grid>
          </Grid>
        
      </Container>
    </CssBaseline>
    
  );
}

export default App;
