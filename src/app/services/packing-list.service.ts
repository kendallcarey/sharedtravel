import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {UpdatePackingListAction} from "../actions/packing-list";
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable()
export class PackingListService {
    items: FirebaseListObservable<any>;
    constructor(private af: AngularFire, private store: Store<fromRoot.State>) {
        this.items = af.database.list('packingLists/myid/items/');
        this.items.subscribe(
          items => {
              store.dispatch(new UpdatePackingListAction(items));
          }
        );
    }

}