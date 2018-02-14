import {Component} from '@angular/core';
import {WordsMatchingGamePage} from '../words-matching-game/words-matching-game';
import {OneOfFiveGamePage} from '../one-of-five-game/one-of-five-game';

@Component({
  selector: 'page-play-tabs',
  templateUrl: 'play-tabs.html',
})
export class PlayTabsPage {
  wordsMatchingGame = WordsMatchingGamePage;
  oneOfFiveGame = OneOfFiveGamePage;
  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayTabsPage');
  }

}
