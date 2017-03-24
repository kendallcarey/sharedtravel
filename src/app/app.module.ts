import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { RouterModule, Routes } from '@angular/router';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


import { AppComponent } from './app.component';
import {reducer} from './store';
import {PackingListComponent} from './components/packing-list/packing-list.component';
import { EffectsModule } from '@ngrx/effects';
import {PackingListEffects} from './store/packing-list/packing-list.effects';
import {NavbarComponent} from './components/navbar/navbar.component';
import {UserEffects} from './store/user/user.effects';
import {AllPackingListsComponent} from './components/all-packing-lists/all-packing-lists.component';
import {AppRoutingModule} from './app-routing.module';
import {PackingListModule} from './components/packing-list/packing-list.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyBpm4T0czdn-NBqXMWiNBJnRQeOt7dHD9c',
  authDomain: 'share-adventure.firebaseapp.com',
  databaseURL: 'https://share-adventure.firebaseio.com',
  storageBucket: 'share-adventure.appspot.com',
  messagingSenderId: '502666566213'
};
const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    StoreModule.provideStore(reducer),
    EffectsModule.run(PackingListEffects),
    EffectsModule.run(UserEffects),

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
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    PackingListModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PackingListComponent,
    NavbarComponent,
    AllPackingListsComponent
  ],
  bootstrap: [AppComponent],
  providers: [
      LOG_LOGGER_PROVIDERS

  ]
})
export class AppModule { }
