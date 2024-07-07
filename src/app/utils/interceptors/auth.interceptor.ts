import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserAuthStore } from "../stores/auth.store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    readonly userAuthStore = inject(UserAuthStore);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       if(req.url.includes('/login') || req.url.includes('/register')){
            return next.handle(req);
       }

       const authToken = this.userAuthStore.getAccesToken();

       const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(authReq);
    }

}