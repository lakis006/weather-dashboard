$(document).ready(function() {
var theList = [];

var apiKey = "b658bd5b411f73a24b0a88bcf3705cfc";
var inputFromUser = $("#inputId").val().trim();


    
function srchAppends(inputFromUser) {
    var uv1 = "";
    var uv2 = "";
    event.preventDefault();
    theList.push(inputFromUser);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputFromUser + "&apikey=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("The Button Works");
        console.log(response);
        console.log(response.main);
        var conv = tempConvert(response.main.temp);
        $("#place-name").text(response.name);
        $("#temp").text("Temperature: " + conv + "'F");
     
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind: " + response.wind.speed + " MPH");
        uv1 = response.coord.lat;
        uv2 = response.coord.lon;
        jamal(uv1, uv2);
       
    })


    
    renderListItems();
  

};
$("#searchbtn").on("click", function (event) {srchAppends(inputFromUser)});
$("#list-group").on("click","li", function(){
    srchAppends($(this).text()); 
});

$("#searchbtn").on("click", weekForecast);

function  weekForecast (){
    var inputFromUser = $("#inputId").val().trim();
    var apiKey = "84195ee828661450717285da2a13ecae";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputFromUser + "&appid="+apiKey;
    $.ajax({

        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("forecast console");
        console.log(response);

        for(var i = 0; i < 40; i++) {
            var imgSource = "http://openweathermap.org/img/wn/"+ response.list[i].weather[0].icon + "@2x.png"
            console.log(imgSource);
            if(i % 8 === 0) {
                console.log(response.list[i].dt_txt);
                var temp = response.list[i].main.temp;
                var nuTemp = tempConvert(temp)
                console.log(nuTemp);
                var humid = response.list[i].main.humidity;
                var date = response.list[i].dt_txt;
                
                var newDate = date.substr(0,10)
                $("#icon-" + i).attr("src", imgSource);
                $("#temp-" + i).html("Temp: " + nuTemp);
                $("#day-" + i).html(newDate);
                $("#humid-" + i).html("Humidity: " + humid);

            }
        }
     
    })
}

function tempConvert (valNum) {
    var celsius = valNum - 273.15;
    var faren = Math.floor(celsius *(9/5) + 32);
    console.log("the temperature is " + faren + "degrees farenheight");
    console.log(valNum + "this is val num");
    valNum = parseFloat(valNum);

    return(faren);
}






function jamal(x,y) {

  var apiKey = "84195ee828661450717285da2a13ecae";
  var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + x + "&lon=" + y;
    $.ajax({

        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var uvStuff = response.value;
        console.log("vu it works");
        console.log(response);
        console.log(response.value);
        $("#uv-index").html("UV Index: "+ "<a>" + uvStuff);

    })
}



function renderListItems() {
    $("#list-group").empty();

    for (i = 0; i < theList.length; i++) {
        var liChild = $("<li>");
        liChild.on('click', function(){

        });
        liChild.text(theList[i]);
        liChild.appendTo("#list-group");
    }
}

});