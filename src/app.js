const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const hbs  = require('hbs');

const app = express();
const publicDirPath = path.join(__dirname,'../public');
const viewDirPath = path.join(__dirname,'../templates/views');
const partialsDirPath = path.join(__dirname,'../templates/partials');

app.use(express.static(publicDirPath));
app.set('view engine','hbs');
app.set('views',viewDirPath);
hbs.registerPartials(partialsDirPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harpreet Singh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harpreet Singh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Harpreet Singh'
    });
});

app.get('/weather',(req,res) => {

    const address = req.query.search.trim();

    if(address && address.length > 0){
        
        geocode(address,(error,{latitude,longitude,place_name} = {}) => {

            if(error)
            {
                res.send({error}); 
            }
            else
            {
                //GET WEATHER
                weather(latitude,longitude,(error,response) => {
                    
                    if(error)
                    {
                        res.send({
                            error
                        })
                    }
                    else
                    {
                        res.send({
                            location:place_name,
                            weather:response
                        });
                    }
                })      
            }
        });
    }
    else{

        res.send({
             error: 'Invalid parameters'
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harpreet Singh',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harpreet Singh',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000,() => {

    console.log('Listen to port 3000');
});