import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {routes} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Ad} from '../models/Vehicles';
@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  public addAd(ad: Ad): Observable<any> {

    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.log('No JWT found, returning from addAd...');
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${jwt}`
      })
    };
    console.log(`[POST] : ${routes.addAd}`);
    return this.http.post(routes.addAd, ad, httpOptions)
  }

  public getAll(): Observable<any> {
    return this.http.get(routes.getAllAds);
  }

  public deleteAd(id: string) {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.log('No JWT found, returning from addAd...');
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    console.log(`[DELTE] : ${routes.deleteOneAd}`);
    return this.http.delete(`${routes.deleteOneAd}/${id}`, httpOptions)
  }
}
