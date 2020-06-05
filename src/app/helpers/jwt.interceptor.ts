import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { environment } from './.././../environments/environment';
//import { AccountService } from 'src/app/services/account.services';
//import { AuthService } from  './../auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // constructor(private accountService: AccountService) { }
	//constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        // const user = this.accountService.userValue;
        // const isLoggedIn = user && user.token;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser  && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}