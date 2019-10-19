var topics = ["muhammad ali", "elvis", "michael jackson", "james bond", "bruce lee", "prince", "michael jordan", "goofy"];

//Function for getting the GIFs and dumping the GIF in to the div.

function getGifs() {

	const gifs = this.getAttribute("data-gifs");
	const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
	
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

			var gifsImage = document.createElement("img");

			// Added div class to gif
			gifsImage.classList.add("gif");
			gifDiv.classList.add("gif");

		// animated gif: gifsImage.attr("src", results[i].images.fixed_height.url);
		// still gif (fixed_height_still)
		gifsImage.setAttribute("src", results[i].images.fixed_height_still.url);

		gifDiv.append(p);
		gifDiv.append(gifsImage);
		
		document.getElementById("gifsDump").prepend(gifDiv);
		

		}
	}
});
	
};

//starting and stopping gif

// If the gif element inside ‘body’ is ever clicked then run the handler function.  
// Using jQuery here for ease and simplicity.
//document.getElementsByTagName('body').addEventListener("click", '.gif', function() {
//document.body.addEventListener("click", '.gif').classList
//document.body.addEventListener("click", '.gif', function() {

$('body').on('click', '.gif', function() {
//document.body.getElementsByTagName('body').on('click', '.gif', function() {
	let src = $(this).attr("src");
	
	//if(element.classList.contains('playing')) {
    if($(this).hasClass('playing')){
     //stop
	 $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
	 //document.createElement("body").setAttribute("src", src.replace(/\.gif/i, "_s.gif"))
	 $(this).removeClass('playing');
	 //element.classList.remove('playing');
  } else {
    //play
	$(this).addClass('playing');
	//element.classList.add('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

// Initialize div before rendering buttons prior to adding new gifs
function renderButtons(){
	document.getElementById("gifsButtons").innerHTML = "";

	for (var i = 0 ; i < topics.length; i++) {
	//Dynamically generate buttons.
		var a = document.createElement("button");
			a.classList.add("gifs");
			a.setAttribute("data-gifs", topics[i]);
			a.innerHTML = topics[i];
			a.classList.add("btn-info");
			document.getElementById("gifsButtons").append(a);
			
		}	
	}
// Event handler for when a button is pushed.
document.getElementById("addGifs").addEventListener("click", function(e){
	e.preventDefault();
	// User input from the textbox
	var gifs = document.getElementById("gifs-input").value.trim();

	topics.push(gifs);

	renderButtons();

});

$(document).on("click", ".gifs", getGifs);

renderButtons();