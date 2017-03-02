import { Component } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from './actions/log';
import * as fromRoot from './reducers';
import { User } from "models/user";
import '../sass/styles.scss';

interface AppState {
  logger: string[];
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedInUser:User = undefined;
  packingList = true;
  constructor(
      private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getUser).subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
    })
  }
}