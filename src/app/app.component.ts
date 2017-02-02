import { Component } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as log from './actions/log';
import * as fromRoot from './reducers';
import '../sass/styles.scss';

interface AppState {
  logger: string[];
}

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {

}