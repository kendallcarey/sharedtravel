import { createSelector } from 'reselect';
import { ActionReducer, Action } from '@ngrx/store';
import * as packingList from './packing-list.actions';
import {PackingList} from "./packing-list.model";
import {Item} from "../item/item.model";
import {makeid} from "../util";

export interface State {
    packingLists: PackingList[];
};

const initialState: State = {
    packingLists: [],
};

export function reducer(state = initialState, action: packingList.Actions): State {
    switch (action.type) {
        case packingList.ActionTypes.UPDATE_PACKING_LISTS:
            return {
                packingLists: (<packingList.UpdatePackingListsAction>action).payload

            };
        // case packingList.ActionTypes.UPDATE_PACKING_LIST:
        //         return {
        //             packingList: [
        //                 items: action.payload
        //             ]
        //         };
        default:
            return state;
    }
}

export const getPackingLists = (state: State) => state.packingLists;
