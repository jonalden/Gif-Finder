const apiKey = "JhYen90npCadGl7DC2SHtIcI7DHBPT9H";

const movies = ["Blade Runner", "Ghostbusters", "The Blues Brothers", "Big Trouble in Little China", "Resevoir Dogs"];


function displayGif(event) {

    const gif = event.target.getAttribute("data-name");

    //API URL that we will be using for a GET request
    const queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + gif + "&limit=10&api_key=JhYen90npCadGl7DC2SHtIcI7DHBPT9H";

    //executing the fetch/get request and converting to readable Json
    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (responseJson) {

            for (let i = 0; i < responseJson.data.length; i++) {
                console.log(responseJson);

                //creating a div to display the gif and giving it a class "gif"
                const gifDiv = document.createElement("div");
                gifDiv.classList.add(".gif");

                //making a variable that grabs the still version of the gif to be displayed initially
                const imageURL = responseJson.data[i].images.original_still.url;

                //creating a new img element and giving it a source of the image URL specified above
                //setting atrributes with vlues of animated or still verisions of the gif
                const image = document.createElement("img");

                const rating = document.createElement("p");
                rating.innerHTML = responseJson.data[i].images.rating;
                

                image.setAttribute("src", imageURL);
                image.setAttribute("data-animate-url", responseJson.data[i].images.original.url);
                image.setAttribute("data-still-url", responseJson.data[i].images.original_still.url);
                image.setAttribute("data-state", "still");

                

                document.querySelectorAll(".gif").forEach(function (element) {
                    element.addEventListener("click", function () {

                        if (element.getAttribute("data-state") === "still") {

                            let animateURL = element.getAttribute("data-animate-url");

                            gifDiv.setAttribute("src", animateURL);
                            gifDiv.setAttribute("data-state", "animate");
                        }
                        else {
                            var stillURL = element.getAttribute("data-still-url");

                            gifDiv.setAttribute("src", stillURL);
                            gifDiv.setAttribute("data-state", "still");
                        }
                    })
                })

                //appending the Json image/gif to the div we created
                gifDiv.append(image);
                gifDiv.prepend(rating);

                //prepending the image/gif to the HTML so the newest image is always on the top
                document.getElementById("gifs-view").prepend(gifDiv);

            }
        })
};


function makeButtons() {


    document.getElementById("buttons-view").innerHTML = "";

    //loooping throught the index "movies" and creating a button for each index
    for (i = 0; i < movies.length; i++) {

        const movieButton = document.createElement("button");
        movieButton.classList.add("movie");
        movieButton.setAttribute("data-name", movies[i]);
        movieButton.innerHTML = movies[i];

        //adding the buttons to the buttons view div and when clicked run the function "displayGif"
        document.getElementById("buttons-view").append(movieButton);
        movieButton.addEventListener("click", displayGif);
    }

}

//function to add user input to the array and create a button
document.getElementById("add-gif").addEventListener("click", function (event) {

    event.preventDefault();
    const grabGif = document.getElementById("gif-input").value.trim();
    movies.push(grabGif);

    console.log(movies);
    makeButtons();
})

makeButtons();