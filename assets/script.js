


var apiKey= "b658bd5b411f73a24b0a88bcf3705cfc";


$("#searchbtn").on("click", function(event) {
    event.preventDefault();
    var inputFromUser = $("#inputId").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputFromUser + "&apikey=" + apiKey;    
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log("The Button Works");
        console.log(response);
        console.log(response.main);
    })
});

