import {NgModule} from '@angular/core';
import {ScoreboardComponent} from './scoreboard/scoreboard';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [CommonModule,BrowserAnimationsModule ],
  exports: [ScoreboardComponent],
})
export class ComponentsModule {
}
