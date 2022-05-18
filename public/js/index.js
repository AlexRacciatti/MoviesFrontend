window.addEventListener('load', () =>{

        //Movies buttons
        const allMovies = document.getElementById('allMovies');
        const oneMovieForm = document.getElementById('oneMovieForm');
        const movieRating = document.getElementById('movieRating');
    
        //Actors buttons
        const allActors = document.getElementById('allActors');
        const oneActor = document.getElementById('oneActor');
        const allMoviesOneActor = document.getElementById('allMoviesOneActor');
    
        //Genres buttons
        const allGenres = document.getElementById('allGenres');
        const allMoviesOneGenre = document.getElementById('allMoviesOneGenre');
    
        //Info container
        const infoContainer = document.getElementById('info-container');
    
        //Table body
        const tableBody = document.getElementById('table-body');
    
    
    function getMoviesFromApi() {

        let movies = [];

        if(movies == ""){
        };

        fetch('https://moviesbackapi.herokuapp.com/api/movies')
        .then(function(res){
           return res.json();
        })
        .then(function(data){

            // infoContainer.innerHTML = "";


            movies = data.data;
            console.log(movies);

            infoContainer.classList.remove('visually-hidden');
            infoContainer.classList.add('movies-container');
           
            
            movies.forEach(movie => {
                tableBody.innerHTML += `
                <tr>
                    <th scope='row'>${movie.id}</th>
                    <td>${movie.title}</td>
                    <td>${movie.genre.name}</td>
                    <td>${movie.rating}</td>
                    <td>${movie.length}</td>
                </tr>
                `
            });
        })
    };
    
    function getMovieFromApiById(id) {
        fetch(`https://moviesbackapi.herokuapp.com/api/movies/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data.data.title);
        })
    };
    
    function getMovieFromApiByMinRating(rating) {
        
    };

    

    oneMovieForm.addEventListener('submit', event => {
        event.preventDefault();
        let movieId = event.target.movieId.value;
        if (movieId == '') return alert("¡Debes ingresar un id!");
        getMovieFromApiById(movieId);

    });

    allMovies.addEventListener('click', () => {
        getMoviesFromApi();
        
    })



    


    
});