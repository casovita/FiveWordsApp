import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayTabsPage } from './play-tabs';

@NgModule({
  declarations: [
    PlayTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayTabsPage),
  ],
})
export class PlayTabsPageModule {}
