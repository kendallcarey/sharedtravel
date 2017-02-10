import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as packingList from '../actions/packing-list';
import { Item } from "../models/item";

@Injectable()
export class PackingListEffects {
    constructor(private actions$: Actions, private af: AngularFire) { }

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

    @Effect()
    completed$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.ITEM_COMPLETED)
        .map((action: packingList.ItemCompletedAction) => action.payload)
        .switchMap(item => {
            if(item == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            item = Object.assign({}, item, {completed: !item.completed})
            return Observable.fromPromise(this.af.database.list('packingLists/myid/items/').update(item.$key, {completed: item.completed}))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });

    @Effect()
    edited$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.EDIT_ITEM)
        .map((action: packingList.EditItemAction) => action.payload)
        .switchMap(item => {
            if(item == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            item = Object.assign({}, item, {name: item.newName})
            console.log('item: ', item.oldItem)
            return Observable.fromPromise(this.af.database.list('packingLists/myid/items/').update(item.oldItem.$key, {name: item.newName}))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });

    @Effect()
    deleted$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.DELETE_ITEM)
        .map((action: packingList.DeleteItemAction) => action.payload)
        .switchMap(item => {
            if(item == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            console.log('item: ', item)
            return Observable.fromPromise(this.af.database.list('packingLists/myid/items/').remove(item.$key))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });
}