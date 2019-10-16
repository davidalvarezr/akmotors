import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {routes} from '../../environments/environment.prod';
import {catchError, mergeMap} from 'rxjs/operators';


interface Credentials {
  username: string,
  password: string,
}


@Injectable({providedIn: 'root'})
export class AuthService {

  private _jwt: string;

  constructor(private http: HttpClient) {}

  /**
   * If credentials are correct, return a JWT
   * @param username
   * @param password
   */
  public login(credentials: Credentials): Observable<any> {
    const request: Observable<any> = this.http.post(routes.login, credentials);
    request.subscribe(
      (response: any) => {
        console.log(`jwt received`);
        this._jwt = response.token;
        console.log(this._jwt);
        localStorage.setItem('jwt', this._jwt);
      },
      (error) => {
        console.error(error);
      }
    );
    return request;
  }

  public logout() {
    this._jwt = null;
    localStorage.removeItem('jwt');
  }


  get jwt(): string {
    return this._jwt;
  }
}
