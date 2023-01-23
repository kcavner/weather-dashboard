# Weather Dashboard
<img src="assets\Capture.JPG">



## Description
- This is a weather dashboard i created utilizing the openweather api data to give daily weather information with a clean user interface.
## Details
- The api call is done with the ajax method of the jquery library. The result of the call is then parsed to the current day element. I used a for loop to iterate through 3 hour increment weather data by making sure the loop incremented +8 each time due to there being 40 3 hour objects including the current day. for each loop a daily forecast element is created with icon url set to the base url and injects the current index icon code for each element.

## What it solves
- The weather dashboard solves a need for fast detailed weather information on any city. The ability to have saved searches easily accessible allows for the user to easily work with different cities weather information.
## What i learned
- The code that is given for the icon must be put inside a url rather than putting that code path in the response object into the src of the img element. Using innerHTML i was able to add elements dynamically like the break elements betwen information. This was done to allow the information to be more readable. The weather date and time path included a time value in the string of the response object. I was able to use .split(" ") to break this string into an array of 2 strings and indexed into the 0 index to grab just the date leaving the time.

## Deployment Link
https://kcavner.github.io/weather-dashboard/

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)