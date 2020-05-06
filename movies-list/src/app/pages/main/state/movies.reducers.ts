import { Movie } from 'src/app/models/movie';
import { MoviesActionTypes, MoviesActions } from './movies.actions';


export interface MoviesState {
    currentMovieId: number | null;
    movies: Movie[];
    error:string;
}

export const initialState: MoviesState = {
    currentMovieId: null,
    movies: [],
    error:'',
};


export function reducer(state: MoviesState = initialState, action: MoviesActions): MoviesState {
    switch (action.type) {
        case MoviesActionTypes.SelectMovie: {
            return {
                ...state,
                currentMovieId: action.payload,
                error:'',
            };
        }

        case MoviesActionTypes.InitializeNewMovie:{
            return{
                ...state,
                currentMovieId:-1
            }
        }

        case MoviesActionTypes.LoadSuccess: {
            return {
                ...state,
                movies: action.payload,
                error:'',
            };
        }

        case MoviesActionTypes.AddOrUpdateMovieSuccess: {
            var updatedMovies;
            var isUpdate = state.movies.find(t=>t.id == action.payload.id);
            if(isUpdate){
                updatedMovies = state.movies.map(t=>
                    action.payload.id == t.id ? action.payload : t)
            }
            else
                updatedMovies = state.movies.concat([action.payload])
            
            return {
                ...state,
                movies: updatedMovies,
                currentMovieId: action.payload.id
            };
        }

        case MoviesActionTypes.DeleteMovieSuccess: {
            const updatedMovies = state.movies.filter(t => t.id != action.payload)
            return {
                ...state,
                movies: updatedMovies,
                currentMovieId:null,
                error:'',
            };
        }
        
        case MoviesActionTypes.AddOrUpdateMovieFail:
        case MoviesActionTypes.LoadFail: 
        case MoviesActionTypes.DeleteMovieFail: {
            return {
                ...state,
                error:action.payload
            };
        }

        default: {
            return state;
        }
    }
}

