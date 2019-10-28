import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {routes} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Ad} from '../models/Vehicles';
import {HttpParamsOptions} from '@angular/common/http/src/params';
@Injectable({
  providedIn: 'root'
})
export class AdService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.getJwt()}`
    })
  };

  constructor(private http: HttpClient) {}

  private getJwt() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.log('No JWT found, returning from addAd...');
      return;
    }
    return jwt;
  }

  // GET ======================================================================

  // Get all ads
  public getAll(): Observable<any> {
    console.log(`[GET] : ${routes.getAllAds}`);
    return this.http.get(routes.getAllAds);
  }

  /**
   * Get one add
   * @param adId the id of the ad we want
   */
  public getOne(adId: string): Observable<any> {
    console.log(`[GET] : ${routes.getOneAd}/${adId}`);
    return this.http.get(`${routes.getOneAd}/${adId}`)
  }

  // POST =====================================================================

  /**
   * Add an add to database
   * @param ad the ad we want to add
   */
  public addAd(ad: Ad): Observable<any> {
    console.log(`[POST] : ${routes.addAd}`);
    return this.http.post(routes.addAd, ad, {...this.httpOptions, observe: 'body', responseType: 'text'})
  }

  /**
   * Add images relative to the ad id containing in the form data
   * @param formData contains files and ad id
   */
  public addImages(formData: FormData): Observable<any> {
    console.log(`[POST] : ${routes.addImages}`);
    return this.http.post(routes.addImages, formData, this.httpOptions);
  }


  // DELETE ===================================================================

  /**
   * Delete all images beginning with a specific ad id.
   * Do not forget to call this method when deleting an add. We do not want its photos to stay on the server
   * @param adId
   */
  public deleteImages(adId: string): Observable<any> {
    console.log(`[DELTE] : ${routes.deleteImages}/${adId}`);
    return this.http.delete(`${routes.deleteImages}/${adId}`, {...this.httpOptions, observe: 'response'});
  }

  // Soft delete the add with the id given
  public softDeleteAd(adId: string): Observable<any> {
    console.log(`[DELTE] : ${routes.softDeleteOneAd}/${adId}`);
    return this.http.delete(`${routes.softDeleteOneAd}/${adId}`, {...this.httpOptions, observe: 'response'})
  }

  // Delete the add with the id given
  public deleteAd(adId: string): Observable<any> {
    console.log(`[DELTE] : ${routes.deleteOneAd}/${adId}`);
    return this.http.delete(`${routes.deleteOneAd}/${adId}`, {...this.httpOptions, observe: 'response'})
  }
}
