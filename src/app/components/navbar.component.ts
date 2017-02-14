import { Component,ViewChild, ElementRef } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from '../actions/log';
import * as fromRoot from '../reducers';
import {PackingList} from "../models/packing-list";
import { PackingListService } from '../services/packing-list.service'
import {AddItemAction} from "../actions/packing-list";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    user = {};
    constructor(
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
                this.user = {};
            }
        });
    }

    login() {
        this.af.auth.login({
            provider: AuthProviders.Facebook
        });
    }

    logout() {
        this.user = {};
        this.af.auth.logout();
        console.log(this.user);
    }
}