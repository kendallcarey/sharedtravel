import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UpdatePackingListsAction } from './packing-list.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../.';
import { PackingList } from './packing-list.model';
import { Item } from '../item/item.model';

@Injectable()
export class PackingListService {
    packingList$: FirebaseListObservable<any>;
    packingLists: any[];
    constructor(private af: AngularFire, private store: Store<fromRoot.State>) {
        this.packingList$ = this.af.database.list('packingLists/');
        this.packingList$.subscribe(
          packingLists => {
              store.dispatch(new UpdatePackingListsAction(packingLists));
          }
        );
    }
    getPackingList(id: string) {
        console.log(id);
        return this.af.database.object('packingLists/' + id)
            .map(
                packingList => {
                    console.log(packingList);
                    let pl = new PackingList();
                    pl.$key = packingList.$key;
                    pl.name = packingList.name;
                    if (packingList.items) {
                        for (let item in packingList.items) {
                            if (item) {
                                let newItem = new Item();
                                newItem.$key = item;
                                newItem.name = packingList.items[newItem.$key].name;
                                newItem.completed = packingList.items[newItem.$key].completed;
                                pl.items.push(newItem);
                            }
                        }
                    }
                    return pl;
                }
            );
    }
}
