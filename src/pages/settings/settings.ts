import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app/store/app.reducers';
import * as GameActions from '../../app/game/store/game-actions';
import {GameTopic, IGameSettings} from '../../app/game/store/game-reducers';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  rootLanguage: string;
  targetLanguage: string;
  topic: GameTopic;
  topicsEnum = GameTopic;

  constructor(private  store: Store<fromApp.AppState>) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.store.select('GameState').subscribe(data => {
      this.rootLanguage = data.GameSettings.RootLanguage;
      this.targetLanguage = data.GameSettings.TargetLanguage;
      this.topic = data.GameSettings.Topic;
    })
  }

  onSave() {
    const gameSettings: IGameSettings = {
      RootLanguage: this.rootLanguage,
      TargetLanguage: this.targetLanguage,
      Topic: this.topic
    }
    this.store.dispatch(new GameActions.SetGameSettings(gameSettings));
  }

}
