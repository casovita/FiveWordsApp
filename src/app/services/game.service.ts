import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGameSettings} from '../store/game/game-reducers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Language} from '../store/game/models/language.enum';
import {GameTopic} from '../store/game/models/game-topic.enum';

@Injectable()
export class GameService {
  private gateway = 'apibase/api/';

  constructor(private http: HttpClient) {
  }

  public GetRoundWords(settings: IGameSettings): Observable<any> {
    return this.http.get(`${this.gateway}${GameTopic[settings.Topic]}/${Language[settings.TargetLanguage]}/${Language[settings.RootLanguage]}`);
  }
}
