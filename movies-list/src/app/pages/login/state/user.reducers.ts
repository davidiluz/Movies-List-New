import { User } from 'src/app/models/user';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
    isLoggedIn: boolean;
    userData: User | null;
    error: string;
}

export const initialState: UserState = {
    isLoggedIn: false,
    userData: null,
    error: '',
};


export function reducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        
        case UserActionTypes.LogInSuccess: {
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload,
                error:'',
            }
        }

        case UserActionTypes.SignUpSuccess:
        case UserActionTypes.ResetError: {
            return {
                ...state,
                error:'',
            }
        }

        case UserActionTypes.SignUpFail:
        case UserActionTypes.LogInFail: {
            return {
                ...state,
                error: action.payload
            }
        }

        case UserActionTypes.LogOut: {
            return {
                ...state,
                isLoggedIn: false,
                userData: null,
            }
        }

        default: {
            return state;
        }
    }
}

