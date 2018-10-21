import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable()
export class ApiService {
  private baseURL = '';

  constructor(private http: HttpClient) {
  }

  get apiUrl() {
    return this.baseURL;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  get options(): any {
    return {
      headers: this.headers
    };
  }

  fixUrl(url: string) {
    return url.replace(/\/?(\?|#|$)/, '/$1');
  }

  get(url: string): Observable<any> {
    return this.http
      .get(`${this.fixUrl(url)}`, this.options)
      .pipe(catchError(this.handleError));
  }

  getWithDynamicQueryTerm(url: string, key: string, val: string): Observable<any> {
    return this.http
      .get(`${this.fixUrl(url)}?${key}=${val}`, this.options)
      .pipe(catchError(this.handleError));
  }

  getWithFixedQueryString(url: string, param: any): Observable<any> {
    const params = new HttpParams().append('query', param);
    const options = {headers: this.headers, params: params};
    return this.http
      .get(`${this.fixUrl(url)}`, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getWithObjectAsQueryString(url: string, param: any): Observable<any> {
    const params: HttpParams = new HttpParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    const options = {headers: this.headers, params: params};
    return this.http
      .get(`${this.fixUrl(url)}`, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  post(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .post(`${this.fixUrl(url)}`, body, this.options)
      .pipe(catchError(this.handleError));
  }

  update(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .put(`${this.fixUrl(url)}`, body, this.options)
      .pipe(catchError(this.handleError));
  }

  patch(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .patch(`${this.fixUrl(url)}`, body, this.options)
      .pipe(catchError(this.handleError));
  }

  delete(url: string, param: any): Observable<any> {
    const params: HttpParams = new HttpParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    const options = {headers: this.headers, params: params};
    return this.http
      .delete(`${this.fixUrl(url)}`, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  deleteWithKey(url: string, key: string, val: string): Observable<any> {
    return this.http
      .delete(`${this.fixUrl(url)}?${key}=${val}`, this.options)
      .pipe(catchError(this.handleError));
  }

  private extractData(res: Response) {
    return res || {};
  }

  private handleError(data: any) {
    let errMsg = '';
    // console.error(errMsg);
    if (Object.keys(data.error).length) {
      errMsg = data.error[Object.keys(data.error)[0]][0];
    }
    return throwError({message: errMsg, messages: data.error, data: data});
  }
}
