import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable, Subscription, BehaviorSubject} from 'rxjs';
import { delay, map, withLatestFrom } from 'rxjs/operators';

import {AVATARS} from './model/user';
import { AsyncItem, makeAsyncItem, AsyncItemState } from './model/async-state';
import { User, AsyncUserList } from './model/user';

const URL_MOCK_USERS = 'assets/users.json';
const RESPONSE_DELAY = 5000;



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private request: Subscription;
  private broadcaster = new BehaviorSubject<AsyncUserList>(this.buildDummy());

  public usersList = this.broadcaster.asObservable();

  constructor(private http: HttpClient) { }

  public loadUsers(): Observable<AsyncItem<User>[]> {
    this.broadcaster.next(this.buildDummy());
    this.queryServe();
    return this.usersList;
  }

  reloadUser(item: AsyncItem<User>) {
    if ( !item.data ) {
      return;
    }
    const user = { ... item.data };
    const findUserInList = (list: User[]) => {
      const found = list.reduce(( foundItem, it) => {
        return foundItem || ((it.email === user.email) ? it : null);
      }, null);
      return found;
    };
    const updateUserInList = (updated, items) => {
      return items.map(it => {
        if ( it.data && (it.data.email === user.email)) {
          it = makeAsyncItem(updated, AsyncItemState.LOADED);
        }
        return it;
      });
    };

    this.http.get(URL_MOCK_USERS).pipe(
      delay(RESPONSE_DELAY),
      map(this.injectAvatars ),
      map(findUserInList),
      withLatestFrom(this.usersList)
    ).subscribe(([updated, items]) => {
      this.broadcaster.next(updateUserInList(updated, items));
    });
    item.state = AsyncItemState.POLLING;
  }

  private queryServe() {
    const response = this.http.get(URL_MOCK_USERS);
    this.request = response.pipe(
          delay(RESPONSE_DELAY),
          map(this.injectAvatars ),
          map(this.wrapAsyncItems),
          map(this.simulatePartialLoads)
        )
        .subscribe(list => {
            this.broadcaster.next(list);
            this.request.unsubscribe();
        });
  }

  private buildDummy(): AsyncUserList {
    return this.wrapAsyncItems(new Array(10).fill(null));

  }

  private injectAvatars(users) {
    const addAvatar = (item, i) => {
      item.avatar = AVATARS[i % AVATARS.length];
    };
    users.forEach(addAvatar);
    return users;
  }

  private wrapAsyncItems(list): AsyncUserList {
    return list.map((user: User) => makeAsyncItem<User>(user, AsyncItemState.LOADING));
  }

  private simulatePartialLoads(list) {
    return list.map((it, i) => {
       const hasData = !!it.data;
       const state = (hasData && ((i + 1) % 5)) ?  AsyncItemState.LOADED : AsyncItemState.LOADING;
       return makeAsyncItem(state === AsyncItemState.LOADING ? null : it.data, state);
    });
  }
}






