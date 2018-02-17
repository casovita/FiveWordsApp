import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app/store/app.reducers';
import * as GameActions from '../../app/game/store/game-actions';
import {Observable} from 'rxjs/Observable';
import {GameLapse} from '../../app/game/store/game-reducers';
import {GameType} from '../../app/game/models/game-type.enum';

@IonicPage()
@Component({
  selector: 'page-words-matching-game',
  templateUrl: 'words-matching-game.html',
})
export class WordsMatchingGamePage implements OnInit {
  roundObj$: Observable<Array<GameLapse>>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GameActions.SetGameType(GameType.WordsMatching))
    this.roundObj$ = this.store.select(a => a.GameState.GameRound);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordsMatchingGamePage');
    this.store.dispatch(new GameActions.GetGameRoundObj());
  }

}
