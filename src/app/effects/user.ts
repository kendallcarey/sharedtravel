import { AngularFire, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as userActions from '../actions/user';
import { User } from "../models/user";
import * as fromRoot from '../reducers';
import {UpdateUserAction} from "../actions/user";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private af: AngularFire, private store: Store<fromRoot.State>) {}

    @Effect()
    user$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.LOG_IN)
        .switchMap(action => {
            console.log('do login');
            return Observable.fromPromise(this.af.auth.login({provider: AuthProviders.Facebook}))
                .map( (user: any) => {
                    console.log('logged in user', user)
                    let newUser:User;
                    newUser.uid = user.uid;
                    newUser.photoURL = user.photoURL;
                    newUser.displayName = user.displayName;
                    this.store.dispatch(new UpdateUserAction(newUser));
                    return new user.LogInSuccessAction()
                })
                .catch( (res: any) => of(new userActions.LogInFailedAction()));
        });

    @Effect()
    loggedOut$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.LOG_OUT)
        .switchMap(action => {
            console.log('do logout');
            return Observable.fromPromise(this.af.auth.logout())
                .map((res: any) => {
                    console.log('logged out user')
                    return new userActions.LogOutSuccessAction()
                })
                .catch( (res: any) => of(new userActions.LogOutFailedAction()));
        });

}