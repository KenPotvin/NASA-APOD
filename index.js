import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {} from 'dotenv/config';

const port = 3000;

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true })); 

const baseUrl = "https://api.nasa.gov/planetary/apod";

// Get NASA API key from environment variables            
const apiKey = `${process.env.NASA_API_KEY}`;
var data = "";
var imgUrl = "";
var config = {
    params: {
        api_key: apiKey,
        date: ""
    }
} 

app.get("/", async (req, res) => {

    try {
        const response = await axios.get(baseUrl, config);
        data = response.data;
        imgUrl = response.data.url;

        //console.log(response.data);
        
    }
    catch (error) {
        console.log("API Error " + error.message);

    }

    res.render("index.ejs", {nasaData: data});
})

app.post("/", async (req, res) => {

    console.log(req.body.date);
    config.params.date = req.body.date;

    try {
        const response = await axios.get(baseUrl, config);
        data = response.data;
        imgUrl = response.data.url;

        //console.log(response.data);
    }
    catch (error) {
        console.log("API Error " + error.message);

    }

    res.render("index.ejs", {nasaData: data});

})

app.get("/about", async (req, res) => {

    res.render("about.ejs", {});
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})