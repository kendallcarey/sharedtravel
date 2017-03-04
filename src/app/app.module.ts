import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { RouterModule, Routes } from '@angular/router';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { getPackingLists } from './store/packing-list/packing-list.reducer';
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


import { AppComponent } from './app.component';
import {reducer} from './store';
import {PackingListComponent} from "./components/packing-list/packing-list.component";
import {ItemComponent} from "./components/item/item.component";
import { EffectsModule } from '@ngrx/effects';
import {PackingListEffects} from "./store/packing-list/packing-list.effects";
import {PackingListService} from "./store/packing-list/packing-list.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {UserEffects} from "./store/user/user.effects";
import {CreatePackingListComponent} from "./components/create-packing-list/create-packing-list.component";
import {AllPackingListsComponent} from "./components/all-packing-lists/all-packing-lists.component";

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

// const appRoutes: Routes = [
//   { path: '', component: AppComponent},
//   { path: 'packing-list/:id', component: PackingListComponent },
//   // { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, FirebaseAuthConfig),
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
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    PackingListComponent,
    ItemComponent,
    NavbarComponent,
    CreatePackingListComponent,
    AllPackingListsComponent
  ],
  bootstrap: [AppComponent],
  providers: [
      LOG_LOGGER_PROVIDERS,
      PackingListService

  ]
})
export class AppModule { }
