import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { getPackingList } from './reducers';
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


import { AppComponent } from './app.component';
import { reducer } from './reducers';
import {PackingListComponent} from "./components/packing-list.component";
import {ItemComponent} from "./components/item.component";
import { EffectsModule } from '@ngrx/effects';
import {PackingListEffects} from "./effects/packing-list";
import {PackingListService} from "./services/packing-list.service";
import {NavbarComponent} from "./components/navbar.component";

export const firebaseConfig = {
  apiKey: "AIzaSyBpm4T0czdn-NBqXMWiNBJnRQeOt7dHD9c",
  authDomain: "share-adventure.firebaseapp.com",
  databaseURL: "https://share-adventure.firebaseio.com",
  storageBucket: "share-adventure.appspot.com",
  messagingSenderId: "502666566213"
};
const FirebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, FirebaseAuthConfig),
    StoreModule.provideStore(reducer),
    EffectsModule.run(PackingListEffects),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    PackingListComponent,
    ItemComponent,
    NavbarComponent
  ],
  bootstrap: [AppComponent],
  providers: [
      LOG_LOGGER_PROVIDERS,
      PackingListService

  ]
})
export class AppModule { }
