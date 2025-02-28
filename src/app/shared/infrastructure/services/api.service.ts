import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CacheService } from './cache.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../../domain/entities/http-options';
import { DataOptions } from '../../domain/entities/data-options';

export enum Verbs {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getBaseHeaders() {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Accept: '*/*',
    });
  }

  getHeadersFormData() {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.getBaseHeaders() });
  }

  cachedGet<T>(options: HttpOptions): Observable<T> {
    return this.httpCall<T>(Verbs.GET, options);
  }

  getwithPagination<T>(url:string, dataOptions: DataOptions) : Observable<T> {
    const paginationHeaders = this.getBaseHeaders().append('DATA-OPTIONS', JSON.stringify(dataOptions))
    return this.http.get<T>(url, { headers: paginationHeaders });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.getBaseHeaders() });
  }



  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body, { headers: this.getBaseHeaders() });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.getBaseHeaders() });
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(url, body, { headers: this.getBaseHeaders() });
  }

  private httpCall<T>(verb: Verbs, options: HttpOptions): Observable<T> {
    const baseHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Setup default values
    options.body = options.body || null;
    options.additionalHeaders = options.additionalHeaders || null;
    options.cacheMins = options.cacheMins || 0;
    options.needsAuthorization = options.needsAuthorization || true;

    return this.http
      .request<T>(verb, options.url, {
        body: options.body,
      })
      .pipe(
        switchMap((response) => {
          if (options.cacheMins && options.cacheMins > 0) {
            // Data will be cached
            this.cacheService.save({
              key: options.url,
              data: response,
              expirationMins: options.cacheMins,
            });
          }
          return of<T>(response);
        })
      );
  }
}
