

export const SET_GAMES = 'SET_GAMES';

const apiurl = "http://localhost:8080";


export function setGames(games){
    return {
        type: SET_GAMES,
        games
    }
}



function handleResponse(response) {
    console.log(response)
  if (response.ok) {
    return response.json();
  } else {
      console.log(response)
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function saveGame(data){
    return dispatch => {
        return fetch('http://localhost:8080/api/game/add',{
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(handleResponse);;
    }
}

export function  fetchGames() {
    return dispatch => {
        return fetch(`${apiurl}/api/games`)
            .then(res => res.json())
            .then(data => dispatch(setGames(data)));
    }
}