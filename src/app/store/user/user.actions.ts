import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from './user.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const actionTypes = {
    LOG_IN:  type('[User] Log In User'),
    LOG_OUT:  type('[User] Log Out User'),
    LOG_IN_SUCCESS: type('[User] Log In Success'),
    LOG_OUT_SUCCESS: type('[User] Log Out Success'),
    LOG_IN_FAILED: type('[User] Log In Failed'),
    LOG_OUT_FAILED: type('[User] Log Out Failed'),
    UPDATE_USER: type('[User] Update User')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions:
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LogInAction implements Action {
    type = actionTypes.LOG_IN;

    constructor() { }
}

export class LogOutAction implements Action {
    type = actionTypes.LOG_OUT;

    constructor() { }
}

export class LogInSuccessAction implements Action {
    type = actionTypes.LOG_IN_SUCCESS;

    constructor() {}
}

export class LogOutSuccessAction implements Action {
    type = actionTypes.LOG_OUT_SUCCESS;

    constructor() {}
}
export class LogInFailedAction implements Action {
    type = actionTypes.LOG_IN_FAILED;

    constructor() {}
}

export class LogOutFailedAction implements Action {
    type = actionTypes.LOG_OUT_FAILED;

    constructor() {}
}

export class UpdateUserAction implements Action {
    type = actionTypes.UPDATE_USER;

    constructor(public payload: User) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = LogInAction
    |  LogOutAction
    |  LogInSuccessAction
    |  LogOutSuccessAction
    |  LogInFailedAction
    |  LogOutFailedAction
    |  UpdateUserAction;
