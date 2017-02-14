import { AngularFire, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as user from '../actions/user';
import { Item } from "../models/item";

@Injectable()
export class UserEffects {
    user = {};
    constructor(private actions$: Actions,
        private af: AngularFire
    ) {
        this.af.auth.subscribe(user => {
            if(user) {
                // user logged in
                this.user = user;
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
        .map((action: user.LogInAction) => action)
        .switchMap(action => {
            console.log('do login');
            return Observable.fromPromise(this.af.auth.login({provider: AuthProviders.Facebook}))
                .map( (user: any) => {
                    console.log('logged in user', user)
                    return new user.LogInSuccessAction()
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