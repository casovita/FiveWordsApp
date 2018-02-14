import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OneOfFiveGamePage } from './one-of-five-game';

@NgModule({
  declarations: [
    OneOfFiveGamePage,
  ],
  imports: [
    IonicPageModule.forChild(OneOfFiveGamePage),
  ],
})
export class OneOfFiveGamePageModule {}
