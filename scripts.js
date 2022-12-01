/*   Assignment: Movie Database - Upcoming Movies
     JS of Movie Database - Upcoming Movies
     Author: Audrey Harmon
     Date: November 10, 2022
*/

// declares an array for storing movie objects
var upcomingMovieList = [];
// assigns a random number to a variable
randomInt = Math.floor(Math.random() * 20)

// onload function
$(document).ready( () => {
    // function is declared for pulling data from api
    function movieData(){
        // the data is grabbed
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=344a400562bbf683b831534b49dcda8e&language=en-US&page=1')
        // and on a successful retrieval from the api, it is parsed
        .then(function(response){
            // the results array of the api data is stored in a variable
            upcomingMovies = response.data.results;
            // looping through the length of the results array
            for(var i = 0; i < upcomingMovies.length; i++){
                // the movie image is grabbed and stored in a variable with the necessary prefix so that 
                // it will display correctly in the browser
                movieImage = "https://image.tmdb.org/t/p/original/" + upcomingMovies[i].poster_path
                // a movie object is created
                Movie = {
                    // the movie title is stored as a data member within the Movie object
                    movieTitle: upcomingMovies[i].original_title,
                    // the movies image is stored as adata member within the Movie object
                    // using the variable above for proper display
                    image: movieImage,
                    // and the overview is stored as a data member within the Movie object
                    overview: upcomingMovies[i].overview
                }
                // the Movie object is appended to the upcoming movie list array
                upcomingMovieList.push(Movie)
            }
        })
    }
    // the function for calling the api is called again
    movieData()

    // a new instance of the Vue object is created
    const app = new Vue({
        // the root element is set by grabbing the div for information to be 
        // displayed in from the DOM
        el: "#root",
        // data members are assigned here
        data: {
            // the pages title is stored in its own data member
            title: 'Upcoming Movies',
            // a random int is assigned as its own data member as well
            randomInt: Math.floor(Math.random() * 20),
            // a movies array is declared as a data member
            movies: [
                // and the array that holds the Movie objects from the api call is
                //contained within the movies data member
                upcomingMovieList
            ],
        },
        // all methods are to be made here
        methods: {
            // the method for the button click is declared 
            nextMovie(){
                // and a new random int is assigned to the data members index within the array
                this.randomInt = Math.floor(Math.random() * 20)
            }
        }
        
    });

})