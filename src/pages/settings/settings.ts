import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app/store/app.reducers';
import * as GameActions from '../../app/game/store/game-actions';
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  rootLanguage: string;

  constructor(private  store: Store<fromApp.AppState>) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.store.select('GameState').subscribe(data => {
      this.rootLanguage = data.RootLanguage;
    })
  }

  onSave() {
    this.store.dispatch(new GameActions.SetRootLanguage(this.rootLanguage));
  }

}
