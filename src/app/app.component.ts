import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SettingsPage} from '../pages/settings/settings';
import {PlayTabsPage} from '../pages/play-tabs/play-tabs';
import {InfoPage} from '../pages/info/info';
import {RulesPage} from '../pages/rules/rules';
import {StatusPage} from '../pages/status/status';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = PlayTabsPage;
  statusPage = StatusPage;
  playTabsPage = PlayTabsPage;
  settingsPage = SettingsPage;
  infoPage = InfoPage;
  rulesPage = RulesPage;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

