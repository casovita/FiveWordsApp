import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGameSettings} from '../game/store/game-reducers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Language} from '../game/models/language.enum';
import {GameTopic} from '../game/models/game-topic.enum';

@Injectable()
export class GameService {
  private gateway = 'apibase/api/';

  constructor(private http: HttpClient) {
  }

  public GetRoundWords(settings: IGameSettings): Observable<any> {
    return this.http.get(`${this.gateway}${GameTopic[settings.Topic]}/${Language[settings.TargetLanguage]}/${Language[settings.RootLanguage]}`);
  }
}
