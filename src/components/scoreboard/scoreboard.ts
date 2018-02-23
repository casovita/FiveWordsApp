import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app/store/app.reducers';
import {GameTopic} from '../../app/store/game/models/game-topic.enum';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'scoreboard',
  templateUrl: 'scoreboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreboardComponent {
  points$: Observable<number>;
  topic: string;

  constructor(private store: Store<fromApp.AppState>) {
    this.points$ = this.store.select((a) => a.UserState.Points);
    this.store.select(a => a.GameState.GameSettings.Topic).subscribe((topic: GameTopic) => {
      this.topic = GameTopic[topic];
    });
  }
}
