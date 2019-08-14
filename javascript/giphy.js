var topics = ["muhammad ali", "elvis", "michael jackson", "james bond", "bruce lee", "prince", "michael jordan", "goofy"];

//Function for getting the GIFs and dumping the GIF in to the div.

function getGifs() {

	const emotion = this.getAttribute("data-emotion");
	const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
	
	// Creating an fetch call for the specific gif button being clicked
	fetch(queryURL)
	.then(function(response) {
      	 return response.json();
	}).then(function(responseJson) {

		console.log(queryURL);
		console.log(responseJson);
		renderButtons();
		var results = responseJson.data;

		for (var i = 0; i < results.length; i++) {
			if (results[i].rating !== "r") {
			var gifDiv = document.createElement("item");
			var p = document.createElement("p").innerText = ("Rating:" + results[i].rating);

			var rating = results[i].rating;

			var emotionImage = document.createElement("img");

			// Added div class to gif
			emotionImage.classList.add("gif");
			gifDiv.classList.add("gif");

		// animated gif: emotionImage.attr("src", results[i].images.fixed_height.url);
		// still gif (fixed_height_still)
		emotionImage.setAttribute("src", results[i].images.fixed_height_still.url);

		gifDiv.append(p);
		gifDiv.append(emotionImage);
		
		document.getElementById("emotions").prepend(gifDiv);
		

		}
	}
});
	
};

//starting and stopping gif

// If the gif element inside ‘body’ is ever clicked then run the handler function.  
// Using jQuery here for ease and simplicity.
$('body').on('click', '.gif', function() {
    let src = $(this).attr("src");
    if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

// Initialize div before rendering buttons prior to adding new gifs
function renderButtons(){
	document.getElementById("emotionButtons").innerHTML = "";

	for (var i = 0 ; i < topics.length; i++) {
	//Dynamically generate buttons.
		var a = document.createElement("button");
			a.classList.add("emotion");
			a.setAttribute("data-emotion", topics[i]);
			a.innerHTML = topics[i];
			a.classList.add("btn-info");
			document.getElementById("emotionButtons").append(a);
			
		}	
	}
// Event handler for when a button is pushed.
document.getElementById("addEmotion").addEventListener("click", function(e){
	e.preventDefault();
	// User input from the textbox
	var emotion = document.getElementById("emotion-input").value.trim();

	topics.push(emotion);

	renderButtons();

});

$(document).on("click", ".emotion", getGifs);

renderButtons();