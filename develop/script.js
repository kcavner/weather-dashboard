// Set HTML elements to variables with jQuery
var searchBtn = $('.submit');
var search = $('.searchBox');
var cityName = $('.cityName');
var temp = $('.temp');
var wind = $('.wind');
var humidity = $('.humidity');
var forecast = $('.forecast');
var clearHistory = $('.clearHistory');
var searchBar = $(".searchHistoryEl");
var searchHistory = [];

// the function to be ran once submit or a history button is clicked
function call() {
  // call the open weather map api with the entry as a parameter looking for cities
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q="+search.val()+"&units=imperial&appid=a020ab6fd91ef914cad117b71296a2ae",
    success: function(result) {
      // initial variables for the search input, local storage object, and the icon url.
      var searchVal = search.val();
      var searches = JSON.parse(localStorage.getItem("searches")) || [];
      var iconurl = "https://openweathermap.org/img/w/" + result.list[0].weather[0].icon + ".png";
      // emptys the forecast and search bar elements before new ones are made dynamically
      forecast.empty();
      searchBar.empty();
      // gives the icon a source with the url variable passed in
      $('#weatherIcon').attr('src', iconurl)
      // pushes the submission to the searchHistory array and local storage
      searches.push(searchVal);
      localStorage.setItem("searches", JSON.stringify(searches));
      // the elements for the current day are created with parsed data from the ajax response
      cityName.text(result.city.name + "  (" + result.list[0].dt_txt.split(' ')[0] + ")");
      temp.text("Temperature:  "+result.list[0].main.temp);
      wind.text("wind:  "+result.list[0].wind.speed + " MPH");
      humidity.text("humidity:  "+result.list[i].main.humidity +"%");
      // for loop creating the next 5 days weather information dynamically
      for (i=6;i<result.list.length;i+=8){
        // variables for the day elements and icons
        var newDay = document.createElement("div");
        var icon = result.list[i].weather[0].icon
        // each div created gets passed the parsed ajax response data as innerHTML dynamically creating elements  and appending them to the 5 day forecast container
        newDay.innerHTML ="<img src='https://openweathermap.org/img/wn/" + icon + ".png' alt='" + icon.description + "'>"+"  (" + result.list[i].dt_txt.split(' ')[0]+")"+"<br>" + "Temperature:  "+result.list[i].main.temp+ "<br>" + "wind:  "+result.list[0].wind.speed + " MPH"+ "<br>" + "humidity:  "+result.list[i].main.humidity +"%";
        newDay.classList.add("forecast2");
        forecast[0].append(newDay);
    }
    // once search is done then the day text function is ran
      dayText();
    }
  });
}
// function to create search buttons from local storage data
function dayText() {
  // search variable set to the local storage object created from user input or empty array
    var searches = JSON.parse(localStorage.getItem("searches")) || []
    // loops through searches and creates buttons that are appended to the search bar container and are given click functionality to run the call function and are given text content to the value of the search in te local storage
    for(i=0;i<searches.length;i++){
      var searchBtnHistory = document.createElement("button");
      searchBtnHistory.textContent = searches[i];
      searchBar.append(searchBtnHistory);
      searchBtnHistory.addEventListener("click", function(){
          search.val(this.textContent);
          call();
      });
    }
  }
// day text is run when page loads so that past searches are immediately available
dayText();
// function to clear history
clearHistory.click(function(){
  localStorage.clear();
  location.reload();
});
// click functionality for the submit button that starts the call function
searchBtn.click(function(){
  call();
});