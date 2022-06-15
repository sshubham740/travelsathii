import React from 'react';
import useStyles from './styles';
import {Button,Box, Typography, Card,CardActions, CardMedia,CardContent,Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import {Rating} from '@material-ui/lab';

const PlaceDetails = ({place, selected, refProps}) => {
  const classes=useStyles();
  if(selected) refProps?.current?.scrollIntoView({behavior: 'smooth', block:'start'})
  return (
    <Card elevation={6}>
      <CardMedia
        style={{height:200}}
        image={place.photo? place.photo.images.large.url:'https://i.pinimg.com/736x/1a/b6/ee/1ab6eebf896ae17d6bdf19e6a948d823.jpg'}
        title={place.name}
      />
      <CardContent>

        <Typography gutterBottom variant='h5'>{place.name}</Typography>

        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} precision={0.5} readOnly/>
          <Typography variant='subtitle2'>from {place.num_reviews?place.num_reviews:0} reviews</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography variant='subtitle2'>{place.price}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography variant='subtitle2'>{place.ranking}</Typography>
        </Box>

        {place?.cuisine?.map(({name})=>(
          <Chip key={name} className={classes.chip} size='small' label={name}></Chip>
        ))}

        {place?.address &&(
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
            <LocationOnIcon/>{place.address}
            </Typography>
        )}

        {place?.phone &&(
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
            <PhoneIcon/>{place.phone}
            </Typography>
        )}

          <CardActions>
            <Button size='small' color='primary' onClick={(e)=>{window.open(place.web_url)}}>TRIPADVISOR</Button>
            <Button size='small' color='primary' onClick={(e)=>{window.open(place.website)}}>WEBSITE</Button>
          </CardActions>

      </CardContent>
    </Card>
  )
}

export default PlaceDetails