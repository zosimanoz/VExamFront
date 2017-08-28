import { 
    SET_GAMES
} from '../actions/games.action';

export default function  games(state = [], action={}) {
    switch (action.type) {
        case SET_GAMES:
            return action.games;
            break;
        default:
            return state
            break;
    }
}   
