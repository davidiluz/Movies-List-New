import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducers';


const getUserFeatureState = createFeatureSelector<fromUser.UserState>('user');

export const getIsUserLoggedIn = createSelector(
    getUserFeatureState,
    state => state.isLoggedIn
)

export const getUserData = createSelector(
    getUserFeatureState,
    state => state.userData
)

export const getUserError = createSelector(
    getUserFeatureState,
    state => state.error
)
