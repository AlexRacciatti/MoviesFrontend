export function tableBodyUpdater(items, tableName) {
    let tableBody = document.getElementById("table-body");
    let infoContainer = document.getElementById("info-container");
    let table = document.getElementById("table");
  
    if (infoContainer) infoContainer.classList.remove("visually-hidden");
    if (table) table.classList.remove("visually-hidden");
  
    if (tableName == "movies") {
      items.forEach((movie) => {
        tableBody.innerHTML += `
                    <tr>
                        <th scope='row'>${movie.id}</th>
                        <td>${movie.title}</td>
                        <td>${movie.genre.name}</td>
                        <td>${movie.rating}</td>
                    </tr>
                    `;
      });
    } else if (tableName == "actors") {
      items.forEach((actor) => {
        actor = formatActorData(actor);
  
        tableBody.innerHTML += `
                    <tr>
                        <th scope='row'>${actor.id}</th>
                        <td>${actor.name}</td>
                        <td>${actor.rating}</td>
                        <td>${actor.favoriteMovie}</td>
                  </tr>
                  `;
      });
    } else if (tableName == "genres") {
      items.forEach((genre) => {
        tableBody.innerHTML += `
                    <tr>
                        <th scope='row'>${genre.id}</th>
                        <td>${genre.name}</td>
                        <td>${genre.rating}</td>
                  </tr>
                  `;
      });
    }
  }
  
  function formatActorData(actor) {
    actor.name = `${actor.first_name} ${actor.last_name}`;
    actor.favoriteMovie = "Jurassic Park";
  
    return actor;
  }