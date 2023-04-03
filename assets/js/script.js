var userInputEl = $('#searchCriteria');


var beerApi = 'https://api.openbrewerydb.org/v1/breweries?by_city=%27userInput%27&per_page=5'


$(document).ready(function(){
    $("#searchBtn").click(function (){
        var userInput = $(userInputEl).val();
        searchFunction(userInput);
    });
});

function searchFunction(userInput) {
    // api search function goes here
    console.log("Your city is: " + userInput);
}