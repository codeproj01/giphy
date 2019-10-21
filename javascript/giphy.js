var topics = ["muhammad ali", "elvis", "michael jackson", "james bond", "bruce lee", "prince", "michael jordan", "goofy"];

// Function for getting the GIFs and dumping the GIF in to the div.

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
		let results = responseJson.data;

		for (let i = 0; i < results.length; i++) {
			if (results[i].rating !== "r") {
			let gifDiv = document.createElement("item");
			let rating = results[i].rating;
			let p = document.createElement("p").innerText = ("Rating:" + results[i].rating);
			let gifsImage = document.createElement("img");
			
				// Added div class to gif
			gifsImage.classList.add("gif");
			gifDiv.classList.add("gif");
        	gifsImage.classList.add("gif");
        		gifsImage.setAttribute("src", results[i].images.original_still.url);
        		gifsImage.setAttribute("data-state", "still");
        		gifsImage.setAttribute("data-animate", results[i].images.original.url);
        		gifsImage.setAttribute("data-still", results[i].images.original_still.url);
        		gifsImage.addEventListener("click", toggleImage);
			gifsImage.setAttribute("src", results[i].images.fixed_height_still.url);

			gifDiv.append(p);
			gifDiv.append(gifsImage);
		
			document.getElementById("gifsDump").prepend(gifDiv);
		}
	}
});
	
};

// Initialize div before rendering buttons prior to adding new gifs
function renderButtons(){
	document.getElementById("gifsButtons").innerHTML = "";

	for (let i = 0 ; i < topics.length; i++) {
	//Dynamically generate buttons.
		let a = document.createElement("button");
			a.classList.add("gifs");
			a.setAttribute("data-gifs", topics[i]);
			a.innerHTML = topics[i];

			document.getElementById("gifsButtons").append(a);
			
		}	
		document.querySelectorAll("button").forEach(function (button) {
			button.addEventListener("click", getGifs);
		});
	}

// Toggle images rendered on click event
function toggleImage (event) {
		const state = event.target.getAttribute("data-state");
		if (state === "still") {
			event.target.setAttribute("src", event.target.getAttribute("data-animate"));
			event.target.setAttribute("data-state", "animate");
		} else {
			event.target.setAttribute("src", event.target.getAttribute("data-still"));
			event.target.setAttribute("data-state", "still");
		}
	}

// Event handler for when a button is pushed.
document.getElementById("addGifs").addEventListener("click", function(e){
	e.preventDefault();
	// User input from the textbox
	let gifs = document.getElementById("gifs-input").value.trim();
	// Add to array
	topics.push(gifs);
	//Show buttons
	renderButtons();
});

renderButtons();