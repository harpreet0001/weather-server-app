const request = require('request');

const geocode = (address,callback) => {

  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiaGFwcHlzaW5naCIsImEiOiJja3d0MHpxenExYnc0MnBwM2tyMmhneXNiIn0.1KhORFxc_NzqldV5JtfM7Q";
  
  request({
    url:url,
    json:true
  },(error,{body} = {}) => {

      if(error)
      {
          callback("Please check your internet connection",undefined);
      } 
      else
      { 
         const features = body.features;
         if(features.length == 0)
         {
            callback("Invalid address please try another",undefined);
         }
         else
         {  
            const feature = features[0];

            const longitude  = feature.center[1];
            const latitude   = feature.center[0];
            const place_name = feature.place_name;

            callback(undefined,{latitude,longitude,place_name});
         }
      }
  });
}

module.exports = geocode;