import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app/store/app.reducers';
import * as GameActions from '../../app/store/game/game-actions';
import {IGameSettings} from '../../app/store/game/game-reducers';
import {Language} from '../../app/store/game/models/language.enum';
import {GameTopic} from '../../app/store/game/models/game-topic.enum';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  rootLanguage: Language;
  targetLanguage: Language;
  topic: GameTopic;
  topicsEnum = GameTopic;
  languagesEnum = Language;

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
    };
    this.store.dispatch(new GameActions.SetGameSettings(gameSettings));
  }

}
