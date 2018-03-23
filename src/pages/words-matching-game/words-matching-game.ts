import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';

import * as fromApp from '../../app/store/app.reducers';
import * as GameActions from '../../app/store/game/game-actions';
import { GameType } from '../../app/store/game/models/game-type.enum';
import { Answer } from '../../app/models/answer';
import { GameButton } from '../../app/models/game-button';
import * as arrayUtil from '../../app/shared/utils/array-util'
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-words-matching-game',
  templateUrl: 'words-matching-game.html',
  animations: [
    trigger('buttonVisibility', [
      state('show', style({ 'display': 'block', })),
      state('hide', style({ 'display': 'none' })),
      transition('* => *', animate('.1s'))
    ]),
    trigger('buttonSelction',[
      state('selected',style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => selected', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])
  ],
})
export class WordsMatchingGamePage implements OnInit {
  rootArray: GameButton[] = [];
  targetArray: GameButton[] = [];
  private currentRootButton: GameButton;
  private currentTargetButton: GameButton;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select(state => state.GameState.GameRound.WordMatching).subscribe((fullArray: Answer[]) => {
      this.initRound(fullArray);
    });

    /*check answer if both selected*/
    this.store.select((state) => state.GameState.CurrentAnswer.WordMatching)
      .switchMap((currentAnswer: Answer) => {
        if (currentAnswer.root != null && currentAnswer.target != null) {
          this.store.dispatch(new GameActions.CheckAnswerWordMatching());
          return of(currentAnswer);
        }
        return of(null);
      }).subscribe();

    // select or hide buttons
    this.store.select(state => state.GameState.CurrentAnswer.WordMatching.isResolved).subscribe((isResolved: boolean) => {
      if (isResolved != null && this.currentRootButton != null && this.currentTargetButton != null) {
        if (isResolved) {
          this.currentRootButton.isVisible = false;
          this.currentTargetButton.isVisible = false;
        } else {
          this.currentRootButton.isActive = false;
          this.currentTargetButton.isActive = false;
        }
      }
    })
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter WordsMatchingGamePage');
    this.store.dispatch(new GameActions.SetGameType(GameType.WordsMatching));
    // this.store.dispatch(new GameActions.GetGameRoundObj());
  }

  onRootSelected(record: GameButton) {
    this.currentRootButton = record;

    record.isActive = true;

    this.rootArray.map((word) => {
      word.isActive = word.value == record.value;
    });
    //store
    this.store.dispatch(new GameActions.SelectWmRoot(record.value));
  }

  onTargetSelected(record: GameButton) {
    this.currentTargetButton = record;

    record.isActive = true;
    this.targetArray.map((word) => {
      word.isActive = word.value == record.value;
    });
    //store
    this.store.dispatch(new GameActions.SelectWmTarget(record.value));
  }

  private initRound(data: Answer[]) {
    if (data) {
      this.rootArray = [];
      this.targetArray = [];
      data.map((pair: Answer) => {
        this.rootArray.push(new GameButton(pair.root, false));
        this.targetArray.push(new GameButton(pair.target, false));
      });
      this.rootArray = arrayUtil.shuffle(this.rootArray);
      this.targetArray = arrayUtil.shuffle(this.targetArray);
    }
  }
}
