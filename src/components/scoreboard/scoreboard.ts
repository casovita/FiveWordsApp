import { ScoreboardAnimationsService } from './../../app/services/scoreboard-animations.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app/store/app.reducers';
import { GameTopic } from '../../app/store/game/models/game-topic.enum';
import { Observable } from 'rxjs/Observable';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'scoreboard',
  templateUrl: 'scoreboard.html',
  animations: [
    trigger('points', [
      state('normal', style({
        'background-color': 'white',
        transform: 'scale(1.1)'
      })),
      state('positive', style({
        'background-color': 'green',
        transform: 'scale(1.1)'
      })),
      state('negative', style({
        'background-color': 'red',
        transform: 'scale(1.1)'
      })),
      transition('normal <=> positive', animate(300)),
      transition('normal <=> negative', animate(300))
    ]),
  ]
})
export class ScoreboardComponent implements OnInit {
  currentPoints$: Observable<number>;
  topic: string;
  pointsState: 'normal' | 'positive' | 'negative' = 'normal';

  constructor(private store: Store<fromApp.AppState>,
    private scorebordAnimations: ScoreboardAnimationsService) {
  }

  ngOnInit(): void {
    this.currentPoints$ = this.store.select((a) => a.UserState.Points);
    this.store.select(a => a.GameState.GameSettings.Topic).subscribe((topic: GameTopic) => {
      this.topic = GameTopic[topic];
    });

    this.scorebordAnimations.getPointsListner().subscribe((payload: number) => {
      if (payload > 0) {
        this.positiveAnimaton();
      } else if (payload < 0) {
        this.negativeAnimation();
      }
    });

  }

  private positiveAnimaton(): void {
    this.pointsState = this.pointsState = 'positive';
    setTimeout(() => this.normalAnimate(), 1000)
  }

  private negativeAnimation(): void {
    this.pointsState = 'negative';
    setTimeout(() => this.normalAnimate(), 1000)
  }

  private normalAnimate(): void {
    this.pointsState = 'normal';
  }
}
