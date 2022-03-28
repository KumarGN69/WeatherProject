const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	
	res.sendFile(__dirname + "/index.html");	
	
});

app.post("/",function(req,res){
	// console.log(req.body.CityName);
	// console.log("post request received");
	const apiKey = "e09ea66b833e5468b8f7d02fd96ed47b";
	const unit = "imperial";
	const city = req.body.CityName;
	
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
	https.get(url,function(response){
		
		response.on("data", function(data){
			
			const weatherObject = JSON.parse(data);
			const imageURL = "http://openweathermap.org/img/wn/"+weatherObject.weather[0].icon+"@2x.png";
			res.write("<h1>Weather conditions in "+weatherObject.name+","+weatherObject.sys.country+" is "+ weatherObject.weather[0].description+"</h1>" );
			res.write("<h1>Temperature is "+ weatherObject.main.temp+" degrees F</h1>" );	
			res.write("<img src="+imageURL+">");
			res.send();
		});
		 
		
	});
});

app.listen(port, function(){
	
	console.log("Server is started on port : "+port);
});