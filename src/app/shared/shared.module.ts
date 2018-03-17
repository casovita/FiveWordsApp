import { ScoreboardAnimationsService } from './../services/scoreboard-animations.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [CommonModule,BrowserAnimationsModule ],
  exports: [],
  providers: [ScoreboardAnimationsService]
})
export class SharedModule {
}
