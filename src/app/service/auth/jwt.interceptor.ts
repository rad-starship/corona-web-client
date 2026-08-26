import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event);
          }
        },
        error: (err: any) => {
          console.log(err);
          if (err instanceof HttpErrorResponse && err.status === 401) {
            // redirect to the login route
            // or show a modal
          }
        }
      })
    );
  }
}