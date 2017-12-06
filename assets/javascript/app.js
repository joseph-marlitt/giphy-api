$(document).ready(function() {
	var gifs = ["Joe", "Sarah", "Evan", "Eric", "Katie", "Tom", "Erin", "Ali", "Ally", "Jordan", "Blake"];
	
  //Displays 10 gifs that are based on the button clicked.
	function displayGiphyInfo() {
		
	    var gif = $(this).attr("data-name");
	   	var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
		
    //call the API using AJAX.
    $("#gif-view").empty();
	    $.ajax({
	      url: queryURL,
	      method: 'GET'
	    }).done(function(response) {
        var results = response.data;
	    	$.each(results, function(index, value){

          //Creates the rating and places it in a paragraph
          var rating = $("<div>")
          rating.addClass("rated")
          rating.text(results[index].rating);
          
          //Creates the image variable from the API
          var image = $("<img>").attr({
            "data-state": "still",
            "src": results[index].images.fixed_height_small_still.url, 
            "data-animate": results[index].images.fixed_height_small.url,
            "data-still": results[index].images.fixed_height_small_still.url, 
          })
          image.text("gifClass")

          //Dynamically add the image and rating to the HTML
          $("#gif-view").prepend(image);
          // $("#gif-view").before("Rating: " + rating);
          $("img").text(rating);
                              
   
      })   
    //On 'Click' function for animating the GIFS
        $("img").click(function(){
          console.log("click!")
          //Animate
          var still = $(this).attr('data-still');
          var active = $(this).attr('data-animate');

          if ($(this).attr("data-state") === "active"){
              $(this).attr('src', still);
              $(this).attr('data-state', 'still');
            }
          // ($(this).attr("data-state") === "still")
          else {
            $(this).attr('src', active);
            $(this).attr('data-state', 'active');
          }

          console.log(still);
          console.log(active);
        })

	   });
  } 
  //Call the display GIF function
  displayGiphyInfo();

  //Function for rendering our array into buttons
  function renderButtons() {

    // Deleting the buttons prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

      // Then dynamicaly generating buttons for each gif in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of gif to our button
      a.addClass("gif");
      a.addClass("btn btn-primary")
      // Adding a data-attribute
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

      // This function handles events where one button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
		// var gif = $("#gif-input").empty();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding the gif from the textbox to our array
        gifs.push(gif);
        console.log(gifs)

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      // Function for displaying the gif info
      // Using $(document).on instead of $(".gif").on to add event listenersto dynamically generated elements
      $(document).on("click", ".gif", displayGiphyInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
});