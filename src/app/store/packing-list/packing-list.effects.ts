import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as packingList from './packing-list.actions';
import { Item } from "../item/item.model";

@Injectable()
export class PackingListEffects {
    constructor(private actions$: Actions, private af: AngularFire) { }

    @Effect()
    loadItem$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.ADD_ITEM)
        .map((action: packingList.AddItemAction) => action.payload)
        .switchMap(newItem => {
            if (newItem.name === '') {
                return of(new packingList.PackingListUpdateFailedAction());
            }

            return Observable.fromPromise(this.af.database.list('packingLists/'+ newItem.packingList.$key +'/items/').push({ name: newItem.name, completed:false}))
                .map( (res: any) => {
                    console.log('map from return of push', res)
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });

    @Effect()
    completedItem$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.ITEM_COMPLETED)
        .map((action: packingList.ItemCompletedAction) => action.payload)
        .switchMap(item => {
            if(item == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            item = Object.assign({}, item, {completed: !item.item.completed})
            console.log('item', item)
            return Observable.fromPromise(this.af.database.list('packingLists/'+ item.packingList.$key +'/items/').update(item.item.$key, {completed: !item.item.completed}))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });

    @Effect()
    editedItem$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.EDIT_ITEM)
        .map((action: packingList.EditItemAction) => action.payload)
        .switchMap(item => {
            if(item == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            item = Object.assign({}, item, {name: item.newName})
            console.log('item: ', item.oldItem)
            return Observable.fromPromise(this.af.database.list('packingLists/'+ item.packingList.$key +'/items/').update(item.oldItem.$key, {name: item.newName}))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });

    @Effect()
    deletedItem$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.DELETE_ITEM)
        .map((action: packingList.DeleteItemAction) => action.payload)
        .switchMap(item => {
            if(item == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            console.log('item: ', item)
            console.log('packingLists/'+ item.packingList.$key +'/items/')
            return Observable.fromPromise(this.af.database.list('packingLists/'+ item.packingList.$key +'items/').remove(item.item.$key))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });
    @Effect()
    newPL$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.ADD_PACKING_LIST)
        .map((action: packingList.AddPackingListAction) => action.payload)
        .switchMap(pl => {
            if (pl === '') {
                return of(new packingList.PackingListUpdateFailedAction());
            }

            return Observable.fromPromise(this.af.database.list('packingLists/').push({ name: pl}))
                .map( (res: any) => {
                    console.log('map from return of push', res)
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });
    @Effect()
    editedPL$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.EDIT_PACKING_LIST)
        .map((action: packingList.EditPackingListAction) => action.payload)
        .switchMap(pl => {
            if(pl == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            pl = Object.assign({}, pl, {name: pl.newName})
            console.log('packingList: ', pl.oldPackingList)
            return Observable.fromPromise(this.af.database.list('packingLists/').update(pl.oldPackingList.$key, {name: pl.newName}))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });
    @Effect()
    deletedPL$: Observable<Action> = this.actions$
        .ofType(packingList.ActionTypes.DELETE_PACKING_LIST)
        .map((action: packingList.DeletePackingListAction) => action.payload)
        .switchMap(pl => {
            if(pl == null) {
                return of(new packingList.PackingListUpdateFailedAction());
            }
            console.log('packingList: ', pl)
            return Observable.fromPromise(this.af.database.list('packingLists/').remove(pl.$key))
                .map( (res: any) => {
                    return new packingList.PackingListUpdateSuccessAction()
                })
                .catch( (res: any) => of(new packingList.PackingListUpdateFailedAction()));
        });
}