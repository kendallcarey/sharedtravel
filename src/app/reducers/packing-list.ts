import { createSelector } from 'reselect';
import { ActionReducer, Action } from '@ngrx/store';
import * as packingList from '../actions/packing-list';
import {PackingList} from "../models/packing-list";
import {Item} from "../models/item";
import {makeid} from "../util";

export interface State {
    packingList: PackingList;
};

const initialState: State = {
    packingList: new PackingList(),
};

export function reducer(state = initialState, action: packingList.Actions): State {
    switch (action.type) {
        case packingList.ActionTypes.UPDATE_PACKING_LIST:
            return {
                packingList: {
                    items: action.payload
                }
            };
        default:
            return state;
    }
}

export const getPackingList = (state: State) => state.packingList;
