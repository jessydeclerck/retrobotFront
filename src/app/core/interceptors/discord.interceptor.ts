import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class DiscordInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.startsWith(environment.retrobotDiscordUrl)) {
      console.log('intercepted')
      request = request.clone({
        setHeaders: {
          Accept: 'Application/json',
          'Content-type': 'Application/json'
        }
      })
    }
    return next.handle(request);
  }
}
