import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
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
import {EffectsModule} from '@ngrx/effects';
import {GameEffects} from './store/game/game.effects';
import {HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {GameService} from './services/game.service';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {ComponentsModule} from '../components/components.module';

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
    EnumPipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GameEffects]),
    StoreDevtoolsModule.instrument()
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
    GameService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
