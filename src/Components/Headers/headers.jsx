import { AppBar, Box, InputBase, Toolbar, Typography } from '@material-ui/core';
import {Autocomplete} from '@react-google-maps/api';
import React, { useState } from 'react';
import { Search } from '@material-ui/icons';
import useStyles from './styles';
import GetPlaces from './../../API/index';

const Headers = ({setCoordinates}) => {
    const classes=useStyles();
    const [autocomplete, setAutoComplete]=useState(null)

    const onLoad=(autoComplete)=>{
        setAutoComplete(autoComplete);
    }

    const onPlaceChanged=()=>{
        const lat= autocomplete.getPlace().geometry.location.lat();
        const lng= autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat,lng})

    }
  return (
    <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
            <Typography variant='h5' className={classes.title}>
                TravelSathi
            </Typography>
            <Box display='flex'>
                <Typography variant='h6' className={classes.title}>
                    Explore
                </Typography>
                
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search/>  
                        </div>
                        <InputBase placeholder='Search...' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                    </div>
                </Autocomplete>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Headers