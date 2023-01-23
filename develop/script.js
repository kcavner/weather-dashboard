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

function call() {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q="+search.val()+"&units=imperial&appid=a020ab6fd91ef914cad117b71296a2ae",
    success: function(result) {
      forecast.empty();
      searchBar.empty();
console.log(result)
      var searchVal = search.val();
      var searches = JSON.parse(localStorage.getItem("searches")) || [];
      var iconurl = "https://openweathermap.org/img/w/" + result.list[0].weather[0].icon + ".png";
      $('#wicon').attr('src', iconurl)
      searches.push(searchVal);
      localStorage.setItem("searches", JSON.stringify(searches));
      
      cityName.text(result.city.name + "  (" + result.list[0].dt_txt.split(' ')[0] + ")");
      temp.text("Temperature:  "+result.list[0].main.temp);
      wind.text("wind:  "+result.list[0].wind.speed + " MPH");
      humidity.text("humidity:  "+result.list[i].main.humidity +"%");

      for (i=6;i<result.list.length;i+=8){
        var newDay = document.createElement("div");
        var icon = result.list[i].weather[0].icon
        console.log(icon)
        newDay.innerHTML ="<img src='https://openweathermap.org/img/wn/" + icon + ".png' alt='" + icon.description + "'>"+"  (" + result.list[i].dt_txt.split(' ')[0]+")"+"<br>" + "Temperature:  "+result.list[i].main.temp+ "<br>" + "wind:  "+result.list[0].wind.speed + " MPH"+ "<br>" + "humidity:  "+result.list[i].main.humidity +"%";
        newDay.classList.add("forecast2");
        forecast[0].append(newDay);
    }
      dayText();
    }
  });
}

function dayText() {
    var searches = JSON.parse(localStorage.getItem("searches")) || []
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

dayText();

clearHistory.click(function(){
  localStorage.clear();
  location.reload();
});

searchBtn.click(function(){
  call();
});