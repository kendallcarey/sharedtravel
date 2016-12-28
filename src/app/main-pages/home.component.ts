import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as fromMainPage from '../reducers/main-page';
import * as page from '../actions/main-page';

export interface User {
  name: string;
  account: {
    email: string;
    confirm: string;
  }
}

@Component({
  selector: 'home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {
  user: FormGroup;
  @Input() readOnly: boolean = false;
  pageState$: Observable<fromMainPage.State>;

  constructor(private store: Store<fromRoot.State>, private fb: FormBuilder, private $log: Logger) {
    this.pageState$ = store.select(fromRoot.getMainPageState);

    this.pageState$.subscribe((state) => {
      this.readOnly = (state.readOnly !== undefined) ? state.readOnly : this.readOnly;
    });
  }

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      account: this.fb.group({
        email: ['', Validators.required],
        confirm: ['', Validators.required]
      })
    });
  }

  hasError(name: string, error: string = undefined): boolean {
    if (name === 'name') {
      if (error) {
        return this.user.get(name).hasError(error) && this.user.get(name).touched;
      } else {
        return this.user.get(name).errors && this.user.get(name).touched;
      }
    } else {
      if (error) {
        return this.user.get('account').get(name).hasError(error) &&
          this.user.get('account').get(name).touched;
      } else {
        return this.user.get('account').get(name).errors &&
          this.user.get('account').get(name).touched;
      }
    }
  }

  onSubmit() {
    console.log(this.user.value, this.user.valid);
  }
}

