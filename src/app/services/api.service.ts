import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

const host = environment.backendHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient) { }

  public setParams(params: object): HttpParams {
    let result: HttpParams = new HttpParams();

    for (const key of Object.keys(params || {})) {
      result = result.set(key, params[key]);
    }

    return result;
  }

  public postLoginUser(params: object): Observable<any> {
    return this.httpClient.post(`${host}/auth/local`, this.setParams(params));
  }

  public postRegistrationUser(params: object): Observable<any> {
    return this.httpClient.post(`${host}/auth/local/register`, this.setParams(params));
  }

  public getCollectionsList(params?: object): Observable<any> {
    return this.httpClient.get(`${host}/collections`, { params: this.setParams(params) });
  }

  public getNotesList(params?: object): Observable<any> {
    return this.httpClient.get(`${host}/notes`, { params: this.setParams(params) });
  }

  public getNoteById(id: number): Observable<any> {
    return this.httpClient.get(`${host}/notes/${id}`);
  }

  public getUsersList(): Observable<any> {
    return this.httpClient.get(`${host}/users`);
  }

  public getUserById(id: number): Observable<any> {
    return this.httpClient.get(`${host}/users/${id}`);
  }
}
