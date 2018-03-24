import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';

import * as GameActions from '../../app/store/game/game-actions';
import {GameType} from '../../app/store/game/models/game-type.enum';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app/store/app.reducers';
import {Answer} from '../../app/models/answer';
import {GameButton} from '../../app/models/game-button';
import * as arrayUtil from '../../app/shared/utils/array-util'
import {of} from 'rxjs/observable/of';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations';


@IonicPage()
@Component({
  selector: 'page-one-of-five-game',
  templateUrl: 'one-of-five-game.html',
  animations:[
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
  ]
})
export class OneOfFiveGamePage implements OnInit {
  public targetWord: Answer;
  public rootArray: Array<GameButton>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select(a => a.GameState.GameRound.OneOfFive).subscribe((array: Answer[]) => {
      if(array != null && array.length > 0) {
        this.targetWord = array[Math.floor(Math.random() * array.length)];
        this.store.dispatch(new GameActions.SelectOopTarget(this.targetWord.target));
        this.initRound(array)
      }
    });

    /*check answer if both selected*/
    this.store.select((state) => state.GameState.CurrentAnswer.OneOfFive)
      .switchMap((currentAnswer: Answer) => {
        if (currentAnswer.root != null && currentAnswer.target != null) {
          this.store.dispatch(new GameActions.CheckAnswerOneOfFive());
          return of(currentAnswer);
        }
        return of(null);
      }).subscribe();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter OneOfFiveGamePage');
    this.store.dispatch(new GameActions.SetGameType(GameType.OneOfFive));
    //this.store.dispatch(new GameActions.GetGameRoundObj());
  }

  public onRootSelected(record: GameButton) {
    record.isActive = true;
    this.store.dispatch(new GameActions.SelectOofRoot(record.value));
  }

  private initRound(array: Answer[]) {
    const tempArray: GameButton[] = array.map(a => new GameButton(a.root));
    this.rootArray = arrayUtil.shuffle(tempArray);
  }
}
