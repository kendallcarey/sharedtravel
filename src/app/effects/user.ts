import { AngularFire, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as user from '../actions/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import { Item } from "../models/item";
import {UpdateUserAction} from "../actions/user";
import {LogInSuccessAction} from "../actions/user";
import {User} from "../models/user";

@Injectable()
export class UserEffects {
    user = {};
    newUser: User;
    constructor(private actions$: Actions,
        private store: Store<fromRoot.State>,
        private af: AngularFire
    ) {
        this.af.auth.subscribe(user => {
            console.log('user: ',user)
            if(user) {
                // user logged in
                this.user = user;
                if(this.user.hasOwnProperty('facebook')) {
                    this.newUser.uid = this.user['facebook']['uid'];
                    this.newUser.displayName = this.user['facebook']['dispayName'];
                    this.newUser.photoURL = this.user['facebook']['photoURL'];
                    this.store.dispatch(new UpdateUserAction(this.newUser));
                }
                console.log(this.user);
            }
            else {
                // user not logged in
                this.user = {};
            }
        });

    }

    @Effect()
    user$: Observable<Action> = this.actions$
        .ofType(user.ActionTypes.LOG_IN)
        .map((action: user.UpdateUserAction) => action.payload)
        .switchMap(action => {
            console.log('do login');
            return Observable.fromPromise(this.af.auth.login({provider: AuthProviders.Facebook}))
                .map( (user: any) => {
                    console.log('logged in user', user)
                    return of(new LogInSuccessAction());
                })
                .catch( (res: any) => of(new user.LogInFailedAction()));
        });

    @Effect()
    loggedOut$: Observable<Action> = this.actions$
        .ofType(user.ActionTypes.LOG_OUT)
        .map((action: user.LogOutAction) => action)
        .switchMap(action => {
            console.log('do logout');
            return Observable.fromPromise(this.af.auth.logout())
                .map((res: any) => {
                    console.log('logged out user')
                    return new user.LogOutSuccessAction()
                })
                .catch( (res: any) => of(new user.LogOutFailedAction()));
        });

}