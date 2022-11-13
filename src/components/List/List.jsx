import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React, { createRef, useState } from 'react'
import useStyle from './listStyle'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import { useEffect } from 'react'

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyle()
  const [ elementRefs, setElementRefs ] = useState([])
 
  useEffect(() => {
      const refs = Array(places?.length).fill().map((_, i) => elementRefs[i] || createRef())
      setElementRefs(refs)
  }, [places])

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants, Hotels and Attractions around you</Typography>
      
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem' />
        </div>  
      ) : ( 
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id='type'>Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={e => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4.0}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, index) => (
              <Grid ref={elementRefs[index]} item key={index} xs={12}>
                <PlaceDetails place={place}
                              selected={Number(childClicked) === index}
                              refProp={elementRefs[index]}/>
              </Grid>
            ) )}
          </Grid>
        </>
       )} 
    </div>
  )
}

export default List