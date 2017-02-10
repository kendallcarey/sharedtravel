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
        case packingList.ActionTypes.EDIT_ITEM:
            let newName: string = action.payload.newName;
            let oldItem: Item = action.payload.oldItem;
            let allItems = state.packingList.items.map(item=>{
               if(item.id == oldItem.id) {
                   return Object.assign({}, oldItem, {name: newName})
               } else {
                   return item;
               }
            });
            return {
                packingList: {
                    items: allItems
                }
            };
        case packingList.ActionTypes.DELETE_ITEM:
            let deletedItem = action.payload;
            return {
                packingList: {
                    items: state.packingList.items.filter(item=>item.id !== deletedItem.id)
                }
            };
        default:
            return state;
    }
}

export const getPackingList = (state: State) => state.packingList;
