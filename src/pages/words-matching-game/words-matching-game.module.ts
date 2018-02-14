import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordsMatchingGamePage } from './words-matching-game';

@NgModule({
  declarations: [
    WordsMatchingGamePage,
  ],
  imports: [
    IonicPageModule.forChild(WordsMatchingGamePage),
  ],
})
export class WordsMatchingGamePageModule {}
