import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'

export class ApiService {

  constructor(private http: HttpClient) { }
  get(url: string): Observable<any> {
    return this.http.get(url, {  })
  }

  post(url:string, element: any): Observable<any> {
    return this.http.post<any>(url, element)
  }

  delete(url: string, id: string): Observable<any> {
    return this.http.delete(url+'/'+id)
  }

  put(url: string, element: any, id?: string): Observable<any> {
    if (id != undefined && id != '') url = url + '/' + id;
    return this.http.put<any>(url, element)
  }
}