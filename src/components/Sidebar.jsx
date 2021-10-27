// import { useState } from 'react';
import { MenuList, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import GlobeIcon from '@mui/icons-material/Language';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';

import Notifications from './Notifications';


const Sidebar = ({feedType, setFeedType}) => {

  
  return (
    <>
    <MenuList>
        <MenuItem onClick={() => setFeedType('user')} >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Feed</ListItemText>
        </MenuItem >
        <MenuItem onClick={() => setFeedType('timeline')}>
          <ListItemIcon>
            <FeedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Timeline</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setFeedType('global')}>
          <ListItemIcon>
            <GlobeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Global Feed</ListItemText>
        </MenuItem>
    </MenuList>
    <Notifications />
    </>
  );
};

export default Sidebar;