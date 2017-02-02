import { Action } from '@ngrx/store';
import { type } from '../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  ADD_MESSAGE:  type('[Log] Add Message'),
  RESET:        type('[Log] Reset'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class AddMessageAction implements Action {
  type = ActionTypes.ADD_MESSAGE;

  constructor(public payload: String) { }
}

export class ResetAction implements Action {
  type = ActionTypes.RESET;

  constructor() { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = AddMessageAction
  | ResetAction;
