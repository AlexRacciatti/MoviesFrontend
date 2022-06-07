//Utilities
import { paginator } from './utils/paginator.js';

window.addEventListener('load', () =>{

    //Movies buttons
    const allMovies = document.getElementById('allMovies');
    const oneMovieForm = document.getElementById('oneMovieForm');
    const movieRating = document.getElementById('movieRatingForm');

    //Actors buttons
    const allActors = document.getElementById('allActors');
    const oneActor = document.getElementById('oneActor');
    const allMoviesOneActor = document.getElementById('allMoviesOneActor');
    
    //Genres buttons
    const allGenres = document.getElementById('allGenres');
    const allMoviesOneGenre = document.getElementById('allMoviesOneGenre');
    
    //Info container
    const infoContainer = document.getElementById('info-container');
    const reusableContainer = document.getElementById('reusable-container')

    //Table selectors head and body
    const tableStructure = document.getElementById('table');
    const tableHead = document.getElementById("table-head");
    const tableBody = document.getElementById('table-body');

    //Loader
    const loader = document.getElementById('loader');

    function displayRequestedTable(tableName) {
        let moviesItems = ["ID", "Título", "Género", "Rating"];
        let actorsItems = ["ID", "Nombre", "Rating", "Película favorita"];
        let genresItems = ["ID", "Nombre", "Ranking"];
    
        tableHead.innerHTML = "";
        tableBody.innerHTML = "";
    
        let tableRow = document.createElement("tr");
    
        if (tableName == "movies") {
          moviesItems.forEach((item) => {
            let tableHeadItem = document.createElement("th");
            tableHeadItem.innerHTML = item;
            tableRow.appendChild(tableHeadItem);
          });
        } else if (tableName == "actors") {
          actorsItems.forEach((item) => {
            let tableHeadItem = document.createElement("th");
            tableHeadItem.innerHTML = item;
            tableRow.appendChild(tableHeadItem);
          });
        } else {
          genresItems.forEach((item) => {
            let tableHeadItem = document.createElement("th");
            tableHeadItem.innerHTML = item;
            tableRow.appendChild(tableHeadItem);
          });
        }
    
        tableHead.appendChild(tableRow);
      }
    
    function getMoviesFromApi() {

        fetch('https://moviesbackapi.herokuapp.com/api/movies')
        .then(function(res){
           return res.json();
        })
        .then(function(data){

            let movies = data.data;
            console.log(movies);

            displayRequestedTable("movies");

            infoContainer.classList.remove('visually-hidden');
            tableStructure.classList.remove('visually-hidden');
            infoContainer.classList.add('movies-container');
            infoContainer.classList.remove('genres-container');
            infoContainer.classList.remove('actors-container');

            movies.forEach(movie => {
                tableBody.innerHTML += `
                <tr>
                    <th scope='row'>${movie.id}</th>
                    <td>${movie.title}</td>
                    <td>${movie.genre.name}</td>
                    <td>${movie.rating}</td>
                </tr>
                `
            });

            loader.classList.add('visually-hidden');
        })
    };
    
    function getMovieFromApiById(id) {
        fetch(`https://moviesbackapi.herokuapp.com/api/movies/${id}`)
        .then(r => r.json())
        .then(data => {
            let movie = data.data;

            displayRequestedTable("movies");

            //Adding styles
            infoContainer.classList.add('movies-container');
            tableStructure.classList.add('visually-hidden');

            //Deleting styles
            infoContainer.classList.remove('visually-hidden');
            infoContainer.classList.remove('actors-container');
            infoContainer.classList.remove('genres-container');

            //Show movie on DOM
            infoContainer.innerHTML = `
                <section id="reusable-container" class="container-sm text-center my-2 py-3 border border-2 border-primary rounded">
                    <img src="../public/img/img-undefined.png" height="150px" class="rounded mx-auto d-block">
                    <h4 class="py-2">${movie.title}</h4>
                    <ul class="list-group">
                        <li class="list-group-item">ID N° ${movie.id}</li>
                        <li class="list-group-item">Duración: ${movie.length} minutos</li>
                        <li class="list-group-item">Género: ${movie.genre_id}) ${movie.genre.name}</li>
                        <li class="list-group-item">Rating: ${movie.rating}</li>
                        <li class="list-group-item">Premios: ${movie.awards}</li>
                    </ul>
                </section>
            `

            //Hide loader
            loader.classList.add('visually-hidden');
        })
    };
    
    function getMovieFromApiByMinRating(rating) {
        fetch(`https://moviesbackapi.herokuapp.com/api/movies/recomended/${rating}`)
          .then(r=>r.json())
          .then(data=>{
              console.log(data.data);

              let moviesByRating = data.data;

              displayRequestedTable("movies");

              infoContainer.classList.remove('visually-hidden');
              tableStructure.classList.remove('visually-hidden');
              infoContainer.classList.add('movies-container');
              infoContainer.classList.remove('genres-container');
              infoContainer.classList.remove('actors-container');
  
              moviesByRating.forEach(movie => {
                  tableBody.innerHTML += `
                  <tr>
                      <th scope='row'>${movie.id}</th>
                      <td>${movie.title}</td>
                      <td>${movie.genre.name}</td>
                      <td>${movie.rating}</td>
                  </tr>
                  `
                });

              loader.classList.add('visually-hidden');
          })
    };

    

    allMovies.addEventListener('click', () => {
        loader.classList.remove('visually-hidden');
        getMoviesFromApi()

        allMovies.classList.add('disabled');
    })

    oneMovieForm.addEventListener('submit', event => {
        event.preventDefault();
        loader.classList.remove('visually-hidden');

        //Capture the ID from the form
        let movieId = event.target.movieId.value;

        //Convert the ID to a number type.
        parseInt(movieId);

        //Catch possible User mistakes
        if (movieId == ''){
            loader.classList.add('visually-hidden');
            return alert("¡Debes ingresar un id!");
        } 
            
        if (movieId > 21){
            loader.classList.add('visually-hidden');
            return alert("¡El número que introduzcas debe corresponder a alguna película! Te recomendamos revisar el listado de películas.")
        } 
        
        //Call the method to do the fetch and show the correct movie
        getMovieFromApiById(movieId);

    });

    movieRating.addEventListener('submit', (event) =>{
        event.preventDefault();
        loader.classList.remove('visually-hidden');

        //Capture the ID from the form
        let movieRating = event.target.movieRating.value;

        //Convert the ID to a number type.
        parseInt(movieRating);

        //Catch possible User mistakes
        if (movieRating == '') {
            loader.classList.add('visually-hidden');
            return alert("¡Debes ingresar un rating válido!");
        }
        
        if (movieRating > 10) {
            loader.classList.add('visually-hidden');
            return alert("¡El rating que introduzcas debe estar entre 1.0 y 10.0!")
        }
        //Call the method to do the fetch and show the correct movie
        getMovieFromApiByMinRating(movieRating);
    })


    //------------------------------ACTORS METHODS------------------------------

    function getActorsFromApi(){
        fetch('https://moviesbackapi.herokuapp.com/api/actors')
          .then(r=>r.json())
          .then((data)=>{
                let actors = data.data;
                displayRequestedTable("actors");
                
                let paginatedActors = paginator(actors);

                console.log(paginatedActors);
                console.log(paginatedActors[0]);                
                console.log(paginatedActors[4]);                


                loader.classList.add('visually-hidden');
          })
    }

    function getActorByIdFromApi(actorId){

    }

    function getMoviesOfActorById(actorId){

    }

    allActors.addEventListener('click', ()=>{
        loader.classList.remove('visually-hidden');

        getActorsFromApi();

        allActors.classList.add('disabled');
    })
    
});