const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello From the Backend Guys!");
});

app.get("/getForecast", async (req, res) => {
	const query = req.query;
	const cityName = query.cityName;

	if (!cityName) {
		res.status(400).json({ error: "Missing required parameter 'cityName'" });
		return;
	}

	const result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d7e1b78d9b70431c8a5141651230212&q=${cityName}&days=1&aqi=no&alerts=no`);
	const data = await result.json();

	let textColor;
	if (data.current.temp_c > 20) {
		textColor = "red";
	} else {
		textColor = "blue";
	}

	// divided by 10, rounded up.
	const moistLevel = Math.ceil(data.current.humidity / 10); // "💧".repeat(Math.ceil(data.current.humidity / 10));

	res.json({
		city: data.location.name,
		temperature: data.current.temp_c,
		condition: data.current.condition.text,
		chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain,
		textColor,
		moistLevel,
		moonPhase: data.forecast.forecastday[0].astro.moon_phase,
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
