import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'

export class ApiService {

  constructor(private http: HttpClient) { }
  get(url: string, params?:HttpParams, par?:any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('X-Force-Content-Type', 'application/x-www-form-urlencoded;');
    headers.append("Accept", "application/json;charset=utf-8");
    headers.append("Accept-Charset", "charset=utf-8");
    headers.append("charset", "utf-8");
   // headers.append('projectid', this.id);
    if (par) return this.http.get(url,par);
    if (params) return this.http.get(url, { headers: headers, params: params });
   // console.log(params);
    return this.http.get(url);
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