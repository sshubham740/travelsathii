import axios from 'axios';

const GetPlaces= async (type, sw, ne)=>{
    try{
        let response= 
        await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
          {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': 'd4743f6193msh0542b6ad88f510ep1e6929jsn13dce77b675c',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return response
    }
    catch(error){
      console.log(error);
    }
}

export default GetPlaces