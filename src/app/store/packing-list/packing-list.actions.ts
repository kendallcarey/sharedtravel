import { Action } from '@ngrx/store';
import { type } from '../util';
import { Item } from '../item/item.model';
import { PackingList } from './packing-list.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const actionTypes = {
    ADD_ITEM:  type('[Packing-List] Add Item'),
    ITEM_COMPLETED: type('[Packing-List] Completed Item'),
    EDIT_ITEM: type('[Packing-List] Edit Item'),
    DELETE_ITEM: type('[Packing-List] Delete Item'),
    UPDATE_PACKING_LIST_CONTENTS_FAILED: type('[Packing-List] Update Failed'),
    UPDATE_PACKING_LIST_CONTENTS_SUCCESS: type('[Packing-List] Update Success'),
    EDIT_PACKING_LIST: type('[Packing-List] Edit Packing List'),
    UPDATE_PACKING_LISTS: type('[Packing-List] Update Packing Lists'),
    ADD_PACKING_LIST: type('[Packing-List] Add Packing List'),
    DELETE_PACKING_LIST: type('[Packing-List] delete Packing List')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions:
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class AddItemAction implements Action {
    type = actionTypes.ADD_ITEM;

    constructor(public payload: {name: string, packingList: PackingList}) { }
}

export class ItemCompletedAction implements Action {
    type = actionTypes.ITEM_COMPLETED;

    constructor(public payload: {item: Item, packingList: PackingList}) { }
}

export class EditItemAction implements Action {
    type = actionTypes.EDIT_ITEM;

    constructor(public payload: {newName: string, oldItem: Item, packingList: PackingList}) { }
}

export class DeleteItemAction implements Action {
    type = actionTypes.DELETE_ITEM;

    constructor(public payload: {item: Item, packingList: PackingList}) { }
}

export class PackingListUpdateFailedAction implements Action {
    type = actionTypes.UPDATE_PACKING_LIST_CONTENTS_FAILED;

    constructor() {}
}

export class PackingListUpdateSuccessAction implements Action {
    type = actionTypes.UPDATE_PACKING_LIST_CONTENTS_SUCCESS;

    constructor() {}
}

export class EditPackingListAction implements Action {
    type = actionTypes.EDIT_PACKING_LIST;

    constructor(public payload: {newName: string, oldPackingList: PackingList}) {

    }
}

export class UpdatePackingListsAction implements Action {
    type = actionTypes.UPDATE_PACKING_LISTS;

    constructor(public payload: PackingList[]) {

    }
}

export class AddPackingListAction implements Action {
    type = actionTypes.ADD_PACKING_LIST;

    constructor(public payload: string) {

    }
}

export class DeletePackingListAction implements Action {
    type = actionTypes.DELETE_PACKING_LIST;

    constructor(public payload: PackingList) {

    }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = AddItemAction
    |  ItemCompletedAction
    |  EditItemAction
    |  DeleteItemAction
    |  PackingListUpdateFailedAction
    |  PackingListUpdateSuccessAction
    |  EditPackingListAction
    |  UpdatePackingListsAction
    |  AddPackingListAction
    |  DeletePackingListAction;
