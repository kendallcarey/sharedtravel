import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from '../actions/log';
import * as fromRoot from '../reducers';
import {User} from "../models/user";
import { PackingListService } from '../services/packing-list.service'
import {LogInAction} from "../actions/user";
import {LogOutAction} from "../actions/user";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    user = {};
    constructor(
        private store: Store<fromRoot.State>,
        public af: AngularFire
    ) {
        this.af.auth.subscribe(user => {
            if(user) {
                // user logged in
                this.user = user;
                console.log(this.user);
            }
            else {
                // user not logged in
                this.user = undefined;
            }
        });
    }

    login() {
        this.store.dispatch(new LogInAction());
        console.log(this.user);
    }

    logout() {
        console.log('logout clicked');
        this.store.dispatch(new LogOutAction());
        console.log(this.user);
    }
}