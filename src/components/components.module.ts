import {NgModule} from '@angular/core';
import {ScoreboardComponent} from './scoreboard/scoreboard';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [CommonModule,BrowserAnimationsModule,IonicModule.forRoot(ScoreboardComponent) ],
  exports: [ScoreboardComponent],
})
export class ComponentsModule {
}
