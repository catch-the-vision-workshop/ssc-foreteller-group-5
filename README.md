# SSC-Foreteller

## Overview

We will be creating our very own weather forecast application. We will be covering a lot of topics, but no need to fully grasp everything. Most of the topics here will be revisited again in other subjects such as ITE222, ITE120 , ITE220, ITE343

![](/assets/syn-pred1.png) ![](/assets/syn-pred2.png) ![](/assets/syn-pred3.png) ![](/assets/syn-pred4.png)

## Getting Started

### Frontend

- Your main job is to modify the file `frontend/code.js` and `frontend/index.html` to match the requirements below
- (If you can) Decorate your website so it looks better - we will be showing each group's website at the end
- You can see the current website by using [Live Server VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  - Open `frontend/index.html`, then right click anywhere on the editor and choose "Open with Live Server"

### Backend

- Your main job is to modify `backend/index.js` to aggregate the data retrieved from WeatherAPI.com and send it to the frontend
- You can test the program by running following commands in the terminal

  - `cd backend`
  - `npm i` (only for the first time you're running the program)
  - `npm run start`
  - You should be able to access the application by typing `http://localhost:3000/getForecast` in your browser
  - Notice that there are some fields that contain invalid data (Like fields with value of `null`,`0`, or `""`)
    - These values need to be aggregated and calculated in the backend first before sending to frontend to display

  ```json
  // Before
  {
    "city": "Bangkok",
    "temperature": 34,
    "condition": "Partly cloudy",
    "chanceOfRain": 0,
    "textColor": "black",
    "moistLevel": 0,
    "moonPhase": "Waning Crescent",
    "averageTemp": 0,
    "maxTemp": null,
    "minTemp": null,
    "maxUVIndex": 0,
    "maxUVTime": ""
  }

  // After
  {
    "city": "Bangkok",
    "temperature": 34,
    "condition": "Partly cloudy",
    "chanceOfRain": 0,
    "textColor": "red",
    "moistLevel": 4.7,
    "moonPhase": "Waning Crescent",
    "averageTemp": 29.754166666666666,
    "maxTemp": 34,
    "minTemp": 27.1,
    "maxUVIndex": 8,
    "maxUVTime": "2023-12-11 10:00"
  }
  ```

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

#### What we have done for you

- Send a HTTP request to OpenWeather API to retrieve forecast data
- Convert the retrieved data into JSON format ready to be used in our program

  ##### How to use the converted data (Optional if you want to go beyond the given task)

  Assuming the JSON is as shown below. You can access each elements in your code via `data.<field-you-want-to-access>`.

  For example: `data.location.name` will return `"Bangkok"` and `data.current.temp_c` will return `34.0`

  ```json
  "location": {
        "name": "Bangkok",
        "region": "Krung Thep",
        "country": "Thailand",
        "lat": 13.75,
        "lon": 100.52,
        "tz_id": "Asia/Bangkok",
        "localtime_epoch": 1702276925,
        "localtime": "2023-12-11 13:42"
    },
    "current": {
        "last_updated_epoch": 1702276200,
        "last_updated": "2023-12-11 13:30",
        "temp_c": 34.0,
        "temp_f": 93.2,
        "is_day": 1,

        .../// and more
  ```

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

  - Variables:

    - `forecastDay` is a variable that represents the first day in the forecast array
    - `hours` is an array containing weather data for in each hour (so there will be 24 elements in the array representing 24 hours)
    - `sumTemp` is initialized to `0`. This variable will hold the sum of all temperature readings.
    - `maxTemp` is initialized to `-Infinity`. This is a common technique to ensure any temperature will be higher than this initial value.
    - `minTemp` is initialized to `Infinity` for the opposite reason; any temperature will be lower than this initial value.
    - `averageTemp` is a variable to hold the value of the average temperature after you have calculated it

  - Steps:

    - Use `for loop` to iterate over each hour in the `hours` array.
      - `hours[i].temp_c` gives you the current temperature (in Celsius) for that specific hour.
    - Finding the total sum of temperature
      - Each iteration, add the value of current temperature(`hours[i].temp_c`) to `sumTemp`
    - Finding the maximum and minimum temperature
      - Each iteration, if the current temperature is greater than `maxTemp`, `maxTemp` is updated to this new value.
      - Similarly, if the current temperature is less than `minTemp`, `minTemp` is updated.
    - Calculate the average temperature
      - After the loop, divide `sumTemp` by the length of the `hours` array.

    ```js
    for (let i = 0; i < hours.length; i++) {
      const currentTemperature = hours[i].temp_c;

      // add current temperature to sumTemp

      // if current temperature is greater than maxTemp, update value of maxTemp to current temperature

      // if current temperature is less than mainTemp, update value minTemp to the current temperature
    }

    // find average temperature
    ```

- Find the maximum UV index from a set of data along with the time it occurs

  - Variables:

    - `maxUVIndex` is initialized to 0. This will store the highest UV index found in the data.
    - `maxUVTime` is initialized to an empty string. This will later store the time at which the maximum UV index occurs.

  - Steps:

    - Use `for loop` to iterate over the `hours` array, which contains hourly weather data.

      - `hours[i].uv` gives you the UV index for that specific hour.
      - `hours[i].time` gives you the datetime data (e.g. `2023-12-11 12:00`) for that specific hour.

    - Inside the loop, compares the current UV index (`hours[i].uv`) with `maxUVIndex`.

      - If the current UV index is greater than `maxUVIndex`
        - update `maxUVIndex` with the current UV index
        - update `maxUVTime` with the corresponding time.
