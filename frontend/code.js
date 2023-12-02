const cityForm = document.getElementById("cityForm");

// move to backend
async function getForecast(cityName) {
	const result = await fetch(`http://localhost:3000/getForecast?cityName=${cityName}`);
	const data = await result.json();

	return data;
}

cityForm.onsubmit = async function (event) {
	event.preventDefault();
	document.getElementById("result").innerText = `Loading...`;

	const city = document.getElementById("city").value;

	const result = await getForecast(city);
	console.log(result);

	// 	const resultHTML = `
	// Current temperature in ${city} is:
	// <span class=\"font-bold text-2xl\">${result.current.temp_c}&#8451;</span>

	// <span class=\"text-center\">
	// 	<img src=\"${result.current.condition.icon}\" alt=\"${result.current.condition.text}\">
	// 	${result.current.condition.text}
	// </span>

	// <span>
	// 	Chance of rain: ${chanceOfRain}%
	// </span>
	// 	`;

	// 	document.getElementById("result").innerHTML = resultHTML;
};
