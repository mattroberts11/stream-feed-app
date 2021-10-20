import { useState } from 'react';
import { MenuList, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import GlobeIcon from '@mui/icons-material/Language';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';


const Sidebar = () => {

  return (
    <MenuList>
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Feed</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FeedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Timeline</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <GlobeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Global Feed</ListItemText>
        </MenuItem>
    </MenuList>
  );
};

export default Sidebar;