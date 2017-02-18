import { createSelector } from 'reselect';
import { ActionReducer, Action } from '@ngrx/store';
import * as user from '../actions/user';
import {User} from "../models/user";
import {makeid} from "../util";

export interface State {
    user: User;
};

const initialState: State = {
    user: undefined,
};


export function reducer(state = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.ActionTypes.UPDATE_USER:
            return {
                user: action.payload
            };
        default:
            return state;
    }
}

export const getUser = (state: State) => state.user;
