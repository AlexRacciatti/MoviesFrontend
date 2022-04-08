window.onload = ()=>{
    
    let movies = []

    fetch('https://moviesbackapi.herokuapp.com/api/movies')
        .then(function(res){
           return res.json();
        })
        .then(function(data){
            
            movies = data.data;
            console.log(movies);
        })

    
}