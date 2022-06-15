import React, {useState, useEffect, createRef} from 'react';
import useStyles from './styles';
import {Typography, CircularProgress, Grid, FormControl, Select, InputLabel, MenuItem} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/placeDetails'

const Lists = ({type, setType, rating, setRating, isLoading, places, childClick}) => {
  const classes=useStyles();
  const [elementRefs, setElementRefs]=useState([]);
  useEffect(()=>{
    const refs= Array(places?.length).fill().map((_,index)=>elementRefs[index] || createRef());
    setElementRefs(refs);
  },[places]);
  
  return (
    <div className={classes.container}>
      <Typography variant='h4'> Explore Restaurants, Hotels, Attractions </Typography>
      {isLoading? (
      <div className={classes.loading}>
        <CircularProgress size='5rem'/>
      </div>):
      (
      <>
        <FormControl style={{margin:'16px'}} className={classes.formControl}>
          <InputLabel>
            I'm looking for...
          </InputLabel>
          <Select value={type} onChange={(e)=>{setType(e.target.value)}}>
            <MenuItem value='restaurants'>Restaurants</MenuItem>
            <MenuItem value='hotels'>Hotels</MenuItem>
            <MenuItem value='attractions'>Attractions</MenuItem>
          </Select>
        </FormControl>

      <FormControl style={{margin:'16px'}} className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e)=>{setRating(e.target.value)}}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>3.0 and above</MenuItem>
          <MenuItem value={4}>4.0 and above</MenuItem>
          <MenuItem value={5}>5.0</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} className={classes.list}>
        {places?.map((place,index)=>(
          <Grid item key={index} ref={elementRefs[index]} xs={12}>
            <PlaceDetails refProps={elementRefs[index]} selected={Number(childClick)===index} place={place}/>
          </Grid>
        ))
        }
      </Grid>
      </>)}
      
    </div>
  )
}

export default Lists