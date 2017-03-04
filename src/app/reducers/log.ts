import { createSelector } from 'reselect';
import { ActionReducer, Action } from '@ngrx/store';
import * as log from '../actions/log';

export interface State {
    messages: String[];
};

const initialState: State = {
    messages: [],
};

export function reducer(state = initialState, action: log.Actions): State {
    switch (action.type) {
        case log.ActionTypes.ADD_MESSAGE:
            return {
                messages: [
                    ...state.messages,
                    action.payload
                ]
            }
        case log.ActionTypes.RESET:
            return initialState;
        default:
            return state;
    }
}

export const getMessages = (state: State) => state.messages;
