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
        case packingList.ActionTypes.ADD_ITEM:
            console.log('packingList addItem');
            let item = new Item();
            item.id = makeid();
            item.name = action.payload;
            item.completed = false;
            return {
                packingList: {
                    items: [
                        ...state.packingList.items,
                        item
                    ]
                }
            };
        default:
            return state;
    }
}

export const getPackingList = (state: State) => state.packingList;
