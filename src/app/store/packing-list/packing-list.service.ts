import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {UpdatePackingListsAction} from "./packing-list.actions";
import { Store } from '@ngrx/store';
import * as fromRoot from '../.';

@Injectable()
export class PackingListService {
    packingLists: FirebaseListObservable<any>;
    constructor(private af: AngularFire, private store: Store<fromRoot.State>) {
        this.packingLists = af.database.list('packingLists/');
        this.packingLists.subscribe(
          packingLists => {
              store.dispatch(new UpdatePackingListsAction(packingLists));
          }
        );
    }

}