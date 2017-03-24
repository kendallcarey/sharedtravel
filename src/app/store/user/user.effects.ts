import { AngularFire, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as userActions from './user.actions';
import { User } from './user.model';
import * as fromRoot from '../.';
import { UpdateUserAction } from './user.actions';

@Injectable()
export class UserEffects {

    @Effect()
    user$: Observable<Action> = this.actions$
        .ofType(userActions.actionTypes.LOG_IN)
        .switchMap(action => {
            console.log('do login');
            return Observable.fromPromise(this.af.auth.login({provider: AuthProviders.Facebook}))
                .map( (user: any) => {
                    console.log('logged in user', user);
                    let newUser: User = new User();
                    newUser.uid = user.uid;
                    newUser.photoURL = user.auth.photoURL;
                    newUser.displayName = user.auth.displayName;
                    this.store.dispatch(new UpdateUserAction(newUser));
                    return new user.LogInSuccessAction();
                })
                .catch( (res: any) => of(new userActions.LogInFailedAction()));
        });

    @Effect()
    loggedOut$: Observable<Action> = this.actions$
        .ofType(userActions.actionTypes.LOG_OUT)
        .switchMap(action => {
            console.log('do logout');
            return Observable.fromPromise(this.af.auth.logout())
                .map((res: any) => {
                    console.log('logged out user');
                    return new userActions.LogOutSuccessAction();
                })
                .catch( (res: any) => of(new userActions.LogOutFailedAction()));
        });

    constructor(
        private actions$: Actions,
        private af: AngularFire,
        private store: Store<fromRoot.State>
    ) {}
}
