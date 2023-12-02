// Pls no touchy touchy this section yes?
const cityForm = document.getElementById("cityForm");
const moonPhaseEmojis = {
	"New Moon": "🌑",
	"Waxing Crescent": "🌒",
	"First Quarter": "🌓",
	"Waxing Gibbous": "🌔",
	"Full Moon": "🌕",
	"Waning Gibbous": "🌖",
	"Last Quarter": "🌗",
	"Waning Crescent": "🌘",
};

async function getForecast(cityName) {
	const result = await fetch(`http://localhost:3000/getForecast?cityName=${cityName}`);
	const data = await result.json();

	return data;
}

// You can touchy touchy this section
cityForm.onsubmit = async function (event) {
	event.preventDefault();
	document.getElementById("result").innerText = `Loading...`;

	const city = document.getElementById("city").value;

	const result = await getForecast(city);
	console.log(result);

	// {
	// 	city: data.location.name,
	// 	temperature: data.current.temp_c,
	// 	condition: data.current.condition.text,
	// 	chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain,
	// 	textColor,
	// 	moistLevel,
	//  moonPhase: data.forecast.forecastday[0].astro.moon_phase,
	// }

	let moistLevelEmojis = "";
	for (let i = 0; i < result.moistLevel; i++) {
		moistLevelEmojis += "💧";
	}

	const resultHTML = `
Current temperature in ${result.city} is:
<span style=\"color: ${result.textColor}\" class=\"font-bold text-2xl\">${result.temperature}&#8451;</span>

<span>
	Chance of rain: ${result.chanceOfRain}%
</span>

<span>
	Mouse Level: ${moistLevelEmojis}
</span>

<span>
	Moon Phase: ${moonPhaseEmojis[result.moonPhase]}
</span>
	`;

	document.getElementById("result").innerHTML = resultHTML;
};
