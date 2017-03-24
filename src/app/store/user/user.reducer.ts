import { createSelector } from 'reselect';
import { ActionReducer, Action } from '@ngrx/store';
import * as user from './user.actions';
import { User } from './user.model';
import { makeid } from '../util';

export interface State {
    user: User;
};

const initialState: State = {
    user: undefined
};

export function reducer(state = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.actionTypes.UPDATE_USER:
            return {
                user: (<user.UpdateUserAction>action).payload
            };
        default:
            return state;
    }
}

export const getUser = (state: State) => state.user;
