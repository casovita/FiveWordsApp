import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {StatusPage} from '../pages/status/status';
import {InfoPage} from '../pages/info/info';
import {RulesPage} from '../pages/rules/rules';
import {SettingsPage} from '../pages/settings/settings';
import {WordsMatchingGamePage} from '../pages/words-matching-game/words-matching-game';
import {OneOfFiveGamePage} from '../pages/one-of-five-game/one-of-five-game';
import {PlayTabsPage} from '../pages/play-tabs/play-tabs';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.reducers';
import {EnumPipe} from './pipes/enum.pipe';

@NgModule({
  declarations: [
    MyApp,
    PlayTabsPage,
    StatusPage,
    InfoPage,
    RulesPage,
    SettingsPage,
    WordsMatchingGamePage,
    OneOfFiveGamePage,
    EnumPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(reducers),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlayTabsPage,
    StatusPage,
    InfoPage,
    RulesPage,
    SettingsPage,
    WordsMatchingGamePage,
    OneOfFiveGamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
