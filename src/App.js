import { CssBaseline, Grid } from '@material-ui/core';
import './App.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api/index'
import { useEffect, useState } from 'react';

function App() {
  const [ places, setPlaces ] = useState([])
  const [ type, setType ] = useState('restaurants')
  const [ rating, setRating ] = useState('')

  const [ filteredPlaces, setFilteredPlaces ] = useState([])
  const [ childClicked, setChildClicked ] = useState(null)
  
  const [ coords, setCoords ] = useState({})
  const [ bounds, setBounds ] = useState(null) 

  const [ isLoading, setIsLoading ] = useState(false)
  const [ autocomplete, setAutocomplete ] = useState(null)
  
  const onLoad = (autocomplete) => setAutocomplete(autocomplete)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoords( { lat, lng })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);
  
  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating, places])

  useEffect(() => {
    if(bounds){
      setIsLoading(true) 
      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => { 
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
          setFilteredPlaces([])
          setIsLoading(false)
      })
    }    
  }, [ type, bounds ])
  
  return (
    <div>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
      <Grid container spacing={3} style={{ width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places} 
                childClicked={childClicked}
                isLoading={isLoading}
                type={type} setType={setType}
                rating={rating} setRating={setRating}
                />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Map 
            coordinates={coords}
            setCoordinates={setCoords}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places} 
            setChildClicked={setChildClicked}            
            />
        </Grid>
      </Grid>
     </div>
  );
}

export default App;
