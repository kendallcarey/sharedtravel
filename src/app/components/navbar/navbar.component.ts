import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/.';
import { User } from '../../store/user/user.model';
import { PackingListService } from '../../store/packing-list/packing-list.service';
import { LogInAction, LogOutAction } from '../../store/user/user.actions';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    loggedInUser: User = undefined;
    constructor(
        private store: Store<fromRoot.State>
    ) {
        this.store.select(fromRoot.getUser).subscribe(user => {
            this.loggedInUser = user;
        });
    }

    login() {
        this.store.dispatch(new LogInAction());
        console.log(this.loggedInUser);
    }

    logout() {
        console.log('logout clicked');
        this.store.dispatch(new LogOutAction());
        console.log(this.loggedInUser);
    }
}
