import {NgModule} from '@angular/core';
import {ScoreboardComponent} from './scoreboard/scoreboard';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [CommonModule ],
  exports: [ScoreboardComponent],
})
export class ComponentsModule {
}
