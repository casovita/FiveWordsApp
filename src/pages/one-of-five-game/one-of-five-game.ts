import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';

import * as GameActions from '../../app/store/game/game-actions';
import {GameType} from '../../app/store/game/models/game-type.enum';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app/store/app.reducers';

@IonicPage()
@Component({
  selector: 'page-one-of-five-game',
  templateUrl: 'one-of-five-game.html',
})
export class OneOfFiveGamePage implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GameActions.SetGameType(GameType.OneOfFive))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OneOfFiveGamePage');
  }

}
