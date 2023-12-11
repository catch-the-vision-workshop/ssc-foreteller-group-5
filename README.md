# SSC-Foreteller

## Overview

We will be creating our very own weather forecast application. We will be covering a lot of topics, but no need to fully grasp everything. Most of the topics here will be revisited again in other subjects such as ITE222, ITE120 , ITE220, ITE343

![](/assets/syn-pred1.png) ![](/assets/syn-pred2.png) ![](/assets/syn-pred3.png) ![](/assets/syn-pred4.png)

## Getting Started

### Frontend

- Your main job is to modify the file `frontend/code.js` and `frontend/index.html` to match the requirements below
- You can test the program by using [Live Server VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  - Open `frontend/index.html`, then right click anywhere on the editor and choose "Open with Live Server"
- Replace the content inside function `getForecast()` with the code below **after** the backend team has finished:
  ```js
  try {
    // Perform a fetch request to the specified URL, passing the city name as a query parameter
    const response = await fetch(
      `http://localhost:3000/getForecast?cityName=${cityName}`
    );
    // Parse the JSON response from the server
    const data = await response.json();
    // Return the parsed data
    return data;
  } catch (error) {
    // Log any errors encountered during the fetch operation
    console.error("Error fetching forecast:", error);
    // Return null to indicate an unsuccessful operation
    return null;
  }
  ```

### Backend

- Your main job is to modify `backend/index.js` to aggregate the data retrieved from WeatherAPI.com and send it to the frontend
- You can test the program by running following commands in the terminal
  - `cd backend`
  - `npm i` (only for the first time you're running the program)
  - `npm run start`
  - You should be able to access the application by typing `http://localhost:3000/getForecast` in your browser

## Requirements

### Frontend

- You are free to make changes to the HTML/CSS as you prefer. However, the following data should be displayed on your website

  - City Name
  - Temperature (With the specified text-color)
  - Chance of Rain
  - Moist Level (Displayed as emojis)
  - Moon Phase (Displayed as emojis)
  - averageTemp
  - maxTemp
  - minTemp
  - maxUVIndex
  - maxUVTime
  - **Warning: Make sure that your HTML Element IDs (`cityForm, city, result`) stay the same**
  - **Hint: Please use tailwind CSS for styling - [the document can be found here](https://tailwindcss.com/docs/text-color)**

- Display the moon emoji depending on the phase

  - If `forecastData.moonPhase` is "New Moon", use 🌑
  - If `forecastData.moonPhase` is "Waxing Crescent", use 🌒
  - If `forecastData.moonPhase` is "First Quarter", use 🌓
  - If `forecastData.moonPhase` is "Waxing Gibbous", use 🌔
  - If `forecastData.moonPhase` is "Full Moon", use 🌕
  - If `forecastData.moonPhase` is "Waning Gibbous", use 🌖
  - If `forecastData.moonPhase` is "Last Quarter", use 🌗
  - If `forecastData.moonPhase` is "Waning Crescent", use 🌘
  - **Hint: you can use both 'if' and 'switch' to do this, entirely up to you :3**

    ```js
    // just so you guys have some idea
    if (forecastData.moonPhase === "Syntax Moon") {
      moonPhaseEmojis = 💩
    }
    ```

- Make a for-loop to add 💧 to a variable called `moistLevelEmojis`

  - **Hint: number of iteration can come from a variable called `forecastData.moistLevel`**

    ```js
    // some hint for you guys - this is a combination between for loops, and string concatenation
    for (let i = 0; i < MOIST_LEVEL_VARIABLE; i++) {
      moistLevelEmojis = moistLevelEmojis + "💩";
    }
    ```

### Backend
#### What already done for you
- `const result = await fetch(weatherAPIUrl);` uses the fetch API to make an asynchronous request to a URL (weatherAPIUrl). This URL is presumably where the weather data is being sourced from.
- `const data = await result.json();` converts the response from the fetch call into JSON format. This is an asynchronous operation, hence the use of await.

#### What you have to do
- Send the text color for the frontend to display:

  - If `data.current.temp_c` is less than 0 - cyan
  - If `data.current.temp_c` is less than 15 - blue
  - If `data.current.temp_c` is less than 30 - orange
  - Anything hotter than this can be displayed as red

    ```js
    if (data.current.temp_c < 999) {
      textColor = "purple";
    }
    ```

- Calculate the moisture level and send to the frontend
  - You can do so by dividing a variable `data.current.humidity` by 10

- Calculate average, max, and min temperature
  - Understanding the Data Structure:
    - The data is presumably coming from a weather forecast API.
    - `data.forecast.forecastday[0]` accesses the forecast for a specific day (the first day in the forecast array).
    - `forecastDay.hour` contains an array of hourly weather data for that day.

  - Initializing Variables:
    - `sumTemp` is initialized to `0`. This variable will hold the sum of all temperature readings.
    - `maxTemp` is initialized to `-Infinity`. This is a common technique to ensure any temperature will be higher than this initial value.
    - `minTemp` is initialized to `Infinity` for the opposite reason; any temperature will be lower than this initial value.

  - Iterating Over the Hours:
    - A `for loop` is used to iterate over each `hour` in the hours array.
    - `hours[i].temp_c` accesses the temperature (in Celsius) for the specific hour.

  - Calculating Sum, Max, and Min:
    - Inside the loop, each temperature is added to `sumTemp`.
    - If the current temperature (`temp`) is greater than `maxTemp`, `maxTemp` is updated to this new value.
    - Similarly, if `temp` is less than `minTemp`, `minTemp` is updated.
    - After the loop, calculate the average temperature. You will divide `sumTemp` by the length of the `hours` array.

  - Tips:
    - **Understanding the Logic**: First, understand how the `for loop`, `if condition`, and the `array` work together to find the maximum, minimum, and average temperature.

- Find the maximum UV index and its time
  - What to do:
    - You have to find the maximum UV (Ultraviolet) index from a set of data, which is coming from a weather forecast API.
    - UV index is a measure of the strength of sunburn-producing ultraviolet radiation at a particular place and time.

  - Initializing Variables:
    - `maxUVIndex` is initialized to 0. This will store the highest UV index found in the data.
    - `maxUVTime` is initialized to an empty string. This will later store the time at which the maximum UV index occurs.

  - Iterating Over Hourly Data:
    - A `for loop` iterates over the `hours` array, which contains hourly weather data.
    - `hours[i].uv` accesses the UV index for the ith hour.
    - `hours[i].time` accesses the time for the ith hour.

  - Finding the Maximum UV Index:
    - Inside the loop, the code compares the current UV index (`uvIndex`) with `maxUVIndex`.
    - If `uvIndex` is greater than `maxUVIndex`, the code updates `maxUVIndex` with `uvIndex` and `maxUVTime` with the corresponding time.

  - Tips:
    - **Understanding the Logic**: First, understand how the `for loop` and the `if condition` work together to find the maximum UV index and its corresponding time.
