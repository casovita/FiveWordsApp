import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app/store/app.reducers';
import * as GameActions from '../../app/store/game/game-actions';
import * as UserActions from '../../app/store/user/user.actions';
import {GameType} from '../../app/store/game/models/game-type.enum';
import {Answer} from '../../app/models/answer';
import {GameButton} from '../../app/models/game-button';

@IonicPage()
@Component({
  selector: 'page-words-matching-game',
  templateUrl: 'words-matching-game.html',
})
export class WordsMatchingGamePage implements OnInit {
  rootArray: GameButton[] = [];
  targetArray: GameButton[] = [];
  answersArray: Answer[] = [];

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GameActions.SetGameType(GameType.WordsMatching));

    this.store.select(a => a.GameState.GameRound).subscribe((fullArray:Answer[]) => {
      this.initRound(fullArray);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordsMatchingGamePage');
    this.store.dispatch(new GameActions.GetGameRoundObj());
  }

  get IsLaltHande(): boolean {
    return this.answersArray.filter(a => a.isResolved == false).length == 0;
  }

  onRootSelected(record: GameButton) {
    const selected = this.targetArray.find(a => a.isActive);
    record.isActive = true;
    this.rootArray.map((word) => {
      if (word.value != record.value) {
        word.isActive = false;
      }
    });
    if (selected) {
      const answer = this.answersArray.find(a => a.root === record.value);
      if (answer.root === record.value && answer.target === selected.value) {
        selected.isVisible = false;
        record.isVisible = false;
        answer.isResolved = true;
        if (this.IsLaltHande) {
          this.store.dispatch(new GameActions.GetGameRoundObj());
        }
        this.updatePoints(2);
      } else {
        this.updatePoints(-2);
      }
      this.clearHand();
    }
  }

  onTargetSelected(record: GameButton) {
    const selected = this.rootArray.find(a => a.isActive);
    record.isActive = true;
    this.targetArray.map((word) => {
      if (word.value != record.value) {
        word.isActive = false;
      }
    });
    if (selected) {
      const answer = this.answersArray.find(a => a.target === record.value);
      if (answer.target === record.value && answer.root === selected.value) {
        selected.isVisible = false;
        record.isVisible = false;
        answer.isResolved = true;
        console.log(this.answersArray);
        if (this.IsLaltHande) {
          this.store.dispatch(new GameActions.GetGameRoundObj());
        }
        this.updatePoints(2);
      } else {
        this.updatePoints(-2);
      }
      this.clearHand();
    }
  }

  private updatePoints(points: number) {
    this.store.dispatch(new UserActions.UpdateUserPoints(points));
  }

  private clearHand() {
    this.targetArray.map((a) => a.isActive = false);
    this.rootArray.map((a) => a.isActive = false);
  }

  private initRound(data: Answer[]) {
    this.rootArray = [];
    this.targetArray = [];
    this.answersArray = [];
    data.map((pair: Answer) => {
      this.rootArray.push(new GameButton(pair.root, false));
      this.targetArray.push(new GameButton(pair.target, false));
      this.answersArray.push(new Answer(pair.root, pair.target, false));
    });
  }
}
