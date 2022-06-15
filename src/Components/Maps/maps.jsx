import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Rating } from '@material-ui/lab';
import useStyles from './styles'
import { useMediaQuery, Paper, Typography } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

const Maps = ({coordinates, setCoordinates, setBounds, setChildClick, places}) => {
    const classes=useStyles();
    const isMobile= useMediaQuery('(max-width: 600px)');
    const defaultCoordinates={lat:28.679079,lng:77.069710}

  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
            bootstrapURLKeys={{ key:process.env.GOOGLE_MAP_KEY}}
            defaultCenter={defaultCoordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e)=>{ 
              setCoordinates({lat:e.center.lat, lng:e.center.lng});
              setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw});
            }}
            onChildClick={(child)=>{setChildClick(child)}}
        >
          {places.length && places.map((place,index)=>(
            //lat lng as place.latitude is coming as Nan?
            
            <div className={classes.markerContainer} lat={place.latitude} lng={place.longitude} key={index}>
              {isMobile?(
                <LocationOnOutlinedIcon color='primary' fontSize='large'/>
                ):(
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.Typography} variant='subtitle2' gutterBottom>
                      {place.name}
                    </Typography> 
                    <img 
                      className={classes.pointer} 
                      alt={place.name}
                      src={place.photo? place.photo.images.large.url:'https://i.pinimg.com/736x/1a/b6/ee/1ab6eebf896ae17d6bdf19e6a948d823.jpg'}
                    />
                    <Rating size='small' value={Number(place.rating)} precision={0.5} readOnly/>
                  </Paper>
                )
              }
            </div>
        ))
        }
        </GoogleMapReact>
    </div>
    
  )
}

export default Maps