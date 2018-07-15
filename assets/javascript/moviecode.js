var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

 function displayMovieInfo() {
   var movie = $(this).attr("data-name");
   console.log(movie);
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
  
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
     console.log(response.data);
     var movieDiv = $("<div class='movie'>");
     var results = response.data;
    
      for (var i = 0; i < results.length; i++) 
      {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13" && results[i].rating !== "pg") 
        {
          var gifDiv = $("<div class='photo'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var personImage = $("<img>");
          personImage.attr("class", "gif");
          personImage.attr("src", results[i].images.fixed_height_still.url)
          personImage.attr("data-still", results[i].images.fixed_height_still.url)
          personImage.attr("data-animate", results[i].images.fixed_height.url) 
          personImage.attr("data-state","still")
          gifDiv.append(p);
          gifDiv.append(personImage);
          $("#movies-view").prepend(gifDiv);

          
        }
      }
      $(".gif").on("click", function() 
      {
        var state = $(this).attr("data-state");
        if (state === "still") 
        {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        else 
        {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
     
  });

 }
 

  function renderButtons() {

   $("#buttons-view").empty();

   for (var i = 0; i < movies.length; i++) {

     var a = $("<button>");
     a.addClass("movie-btn");
 
     a.attr("data-name", movies[i]);
 
     a.text(movies[i]);
 
     $("#buttons-view").append(a);
   }
 }

 
 $("#add-movie").on("click", function(event) {
   event.preventDefault();
    var movie = $("#movie-input").val().trim();

 
   movies.push(movie);

 
   renderButtons();
 });

 
 $(document).on("click", ".movie-btn", displayMovieInfo);

 
 renderButtons();