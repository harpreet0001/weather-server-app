const request = require('request');

const weather = (latitude,longitude,callback) => {

    const url = "http://api.weatherstack.com/current?access_key=f078635a71990755c3f3adca13202b83&query="+latitude+","+longitude;

    request({url,json:true},(error,{body} = {}) => {

        if(error)
        {
            callback('Please check your internet connection',undefined);
        }
        else
        {
           if(body.error)
           {
            callback(body.error,undefined);
           }
           else
           {
             const current = body.current;
             callback(undefined,current.weather_descriptions[0]);
           }
        }
    })

}

module.exports = weather;