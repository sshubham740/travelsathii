import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './Components/Headers/headers';
import List from './Components/Lists/lists';
import Maps from './Components/Maps/maps';
//import placeDetails from './Components/PlaceDetails/placeDetails';
import {CssBaseline, Grid} from '@material-ui/core';
import GetPlaces from './API/index';

function App() {
  const [places, setPlaces]=useState([]);
  const [filteredplaces, setFilteredPlaces]=useState([]);
  const [coordinates, setCoordinates]=useState({});
  const [bounds, setBounds]= useState({});
  const [childClick, setChildClick]= useState(null);
  const [isLoading, setIsLoading]=useState(false);
  const [type, setType]=useState('restaurants');
  const [rating, setRating]= useState(0);

  useEffect(()=>{navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
    setCoordinates({lat:latitude, lng:longitude});
  })},[]);

  useEffect(()=>{
    const filteredPlaces=places.filter((place)=> place.rating>=rating);
    setFilteredPlaces(filteredPlaces);
  },[rating])

  useEffect(()=>{
    setIsLoading(true);
    GetPlaces(type, bounds.sw,bounds.ne).then(res=>{
    setPlaces(res.data.data);
    setIsLoading(false);
    setFilteredPlaces([]);
    setRating(0);
  })},[type,bounds]);


  return (
    <>
      <CssBaseline/>
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{width:'100%'}}>
          <Grid item xs={12} md={4} >
            <List 
              type={type} 
              setType={setType}
              rating={rating}
              setRating={setRating}
              isLoading={isLoading} 
              places={filteredplaces.length?filteredplaces:places} 
              childClick={childClick}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Maps 
              setChildClick={setChildClick} 
              places={filteredplaces.length?filteredplaces:places} 
              coordinates={coordinates} 
              setCoordinates={setCoordinates} 
              setBounds={setBounds}
            />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
