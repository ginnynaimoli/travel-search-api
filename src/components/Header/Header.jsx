import { AppBar, Box, InputBase, Toolbar, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { Autocomplete } from '@react-google-maps/api'
import React from 'react' 
import useStyle from './headerStyle'

const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyle()
  
  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel Advisor
        </Typography>

        <Box display='flex'>
          <Typography variant='h6' className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header