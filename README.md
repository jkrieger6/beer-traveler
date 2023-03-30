# Beer Traveler

![image](https://user-images.githubusercontent.com/125073452/228700569-eeda2d9e-4d0b-4a3a-bad5-39d6e473afff.png)

## User Flow
![image](https://user-images.githubusercontent.com/125073452/228705117-76a34d88-3648-4cdc-9679-4c0fab361dc7.png)


## Project Description
This application will allow a user to search for a location's forecast, the results will include a suggestion of the top brewerys in the area to visit. It will prioritize the type of brewery based on what the weather is.

## User Story
As a traveler I want a web application that can help me find beers based off of the current weather conditions so that i can enjoy beer that fits the weather.

## Acceptance Criteria
WHEN I want to view the weather for a particular city

THEN I can search any city and the current weather will appear

WHEN I am presented with the weather 

THEN I can also seee a list of the top breweries for that city

WHEN I click on a certain brewery 

THEN that I am given details about that particular brewery

## APIs
https://api.openbrewerydb.org/v1/breweries

https://api.openweathermap.org/data/2.5/forecast?lat=$lat}&lon={lon}&units=imperial&appid={weatherApiKey}

https://api.openweathermap.org/geo/1.0/direct?q={searchLocation}&limit=5&appid={weatherApiKey}






