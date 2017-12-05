$(document).ready(function() {
	var gifs = ["Joe", "Sarah", "Evan", "Eric", "Katie", "Tom", "Erin", "Ali", "Ally", "Jordan", "Blake"];
	
	function displayGiphyInfo() {
		
		
	    var gif = $(this).attr("data-name");
	   	var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
		
    $("#gif-view").empty();
	    $.ajax({
	      url: queryURL,
	      method: 'GET'
	    }).done(function(response) {
        var results = response.data;
	    	$.each(results, function(index, value){
          var image = $("<img>").attr({
            "data-state": "still",
            "src": results[index].images.fixed_width_downsampled.url,
            "data-animate": results[index].images.fixed_width_downsampled.url,
            "data-still": results[index].images.fixed_width_downsampled.url, 
          })
           $("#gif-view").prepend(image);
        }) 
 		   });
  } 
      
      displayGiphyInfo();

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