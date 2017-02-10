import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as packingList from '../actions/packing-list';

@Injectable()
export class PackingListEffects {
    constructor(private actions$: Actions, private af: AngularFire) { }

    @Effect()
    all$: Observable<Action> = this.actions$
        .ofType()

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.ADD_ITEM)
        .map((action: packingList.AddItemAction) => action.payload)
        .switchMap(query => {
            if (query === '') {
                return of(new packingList.PackingListUpdateFailedAction());
            }

            return Observable.fromPromise(this.af.database.list('packingLists/myid/items/').push({ name: query, completed:false}))
                .map( (res: any) => {
                    console.log('map from return of push', res)
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });

    // @Effect()
    // completed$: Observable<Action> = this.actions$
    //     .ofType(packingList.ActionTypes.ITEM_COMPLETED)
    //     .map((action: packingList.ItemCompletedAction) => action.payload)
    //     .switchMap(query => {
    //         if(query == null) {
    //             return of(new packingList.PackingListUpdateFailedAction());
    //         }
    //         console.log('query: ',query)
    //         return new packingList.PackingListUpdateSuccessAction();
    //         // return Observable.fromPromise(this.af.database.list('packingLists/myid/items/')).update()
    //     })

}