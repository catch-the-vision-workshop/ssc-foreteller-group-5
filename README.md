# SSC-Foreteller

## Overview

We will be creating our very own weather forecast application. We will be covering a lot of topics, but no need to fully grasp everything. Most of the topics here will be revisted again in other subjects such as ITE222, ITE120 , ITE220, ITE343

![](/assets/syn-pred1.png) ![](/assets/syn-pred2.png)

## Getting Started

### Frontend

- Your main job is to modify the file `frontend/code.js` and `frontend/index.html` to match the requirements below
- You can test the program by using [Live Server VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Replace the content inside funciton `getForecast()` with the code below **after** the backend team has finished:
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

- Your main job is to modify `backend/index.js` to aggregate the data retireved from WeatherAPI.com and send thses data to the frontend
- You can test the program by running the command
  - `npm i` (only for the first time you're running the program)
  - `npm run start`

## Requirements

### Frontend

- You are free to make changes to the HTML/CSS as you prefer. However, the following data should be displayed on your website

  - City Name
  - Temperature (With the specified text-color)
  - Chance of Rain
  - Moist Level (Displayed as emojis)
  - Moon Phase (Displayed as emojis)
  - **Warning: Make sure that your HTML Element IDs (`cityForm, city, result`) stay the same**
  - **Hint: Please use tailwind CSS for styling - [the document can be found here](https://tailwindcss.com/docs/text-color)**

- Display the moon emoji depending on the phase

  - If `forecastData.moonPhase` is "New Moon", use 🌑
  - If `forecaseData.moonPhase` is "Waxing Crescnet", use 🌒
  - If `forecaseData.moonPhase` is "First Quarter", use 🌓
  - If `forecaseData.moonPhase` is "Waxing Gibbous", use 🌔
  - If `forecaseData.moonPhase` is "Full Moon", use 🌕
  - If `forecaseData.moonPhase` is "Waning Gibbous", use 🌖
  - If `forecaseData.moonPhase` is "Last Quarter", use 🌗
  - If `forecaseData.moonPhase` is "Waning Crescent", use 🌘
  - **Hint: you can use both 'if' and 'switch' to do this, entirely up to you :3**

    ```js
    // just so you guys have some idea
    if (forecastData.moonPhase === "Syntax Moon" {
      moonPhaseEmojis = 💩
    }
    ```

- Make a for-loop to add 💧 to a variable called `moistLevelEmojis`

  - **Hint: number of iteration can come from a variable called `forecastData.moistLevel`**

    ```js
    // some hint for guys - this is a combination between for loops, and string concatenation
    for (let i = 0; i < MOIST_LEVEL_VARIABLE; i++) {
      moistLevelEmojis = mositerLevelEmojis + "💩";
    }
    ```

### Backend

- Send the text color for the frontend to display:

  - If `data.current.temp_c` is less than 0 - cyan
  - If `data.current.temp_c` is less than 15 - blue
  - If `data.current.temp_c` is less then 30 - orange
  - Anything hotter than this can be displayed as red

    ```js
    if (data.current.temp_c < 999) {
      textColor = "purple";
    }
    ```

- Calculate the moisture level and send to the frontend
  - You can do so by dividing a variable `data.current.humidity` by 10
