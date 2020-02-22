import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host: string = environment.backendHost;

  constructor(
    private httpClient: HttpClient
  ) { }

  public setParams(params: object): HttpParams {
    let result: HttpParams = new HttpParams();

    for (const key of Object.keys(params || {})) {
      result = result.set(key, params[key]);
    }

    return result;
  }

  public postLoginUser(params: object): Observable<any> {
    return this.httpClient.post(`${this.host}/auth/local`, this.setParams(params));
  }

  public postRegistrationUser(params: object): Observable<any> {
    return this.httpClient.post(`${this.host}/auth/local/register`, this.setParams(params));
  }

  public getCollectionsList(params?: object): Observable<any> {
    return this.httpClient.get(`${this.host}/collections`, { params: this.setParams(params) });
  }

  public getNotesList(params?: object): Observable<any> {
    return this.httpClient.get(`${this.host}/notes`, { params: this.setParams(params) });
  }

  public getNoteById(id: number): Observable<any> {
    return this.httpClient.get(`${this.host}/notes/${id}`);
  }

  public postNote(params?: object): Observable<any> {
    return this.httpClient.post(`${this.host}/notes`, this.setParams(params));
  }

  public getUsersList(): Observable<any> {
    return this.httpClient.get(`${this.host}/users`);
  }

  public getUserById(id: number): Observable<any> {
    return this.httpClient.get(`${this.host}/users/${id}`);
  }
}
