import { User } from 'src/app/models/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, LogIn, UserActionTypes } from './user.actions';

export interface UserState {
    isLoggedIn: boolean;
    userData: User | null;
}

//for lazy loaded modules
//import * as fromRoot from '../../../state/app.state';
// export interface State extends fromRoot.State {
//     user: UserState
// }

export const initialState: UserState = {
    isLoggedIn: false,
    userData: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getIsUserLoggedIn = createSelector(
    getUserFeatureState,
    state => state.isLoggedIn
)

export function reducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.SignUp:
        case UserActionTypes.LogIn: {
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload
            };
        }
        case UserActionTypes.LogOut: {
            return {
                ...state,
                isLoggedIn: false,
                userData: null,
            }
        }
        // case UserActionTypes.SignUp: {
        //     return {
        //         ...state,
        //         isLoggedIn: true,
        //         userData: action.payload
        //     }
        // }
        default: {
            return state;
        }
    }
}