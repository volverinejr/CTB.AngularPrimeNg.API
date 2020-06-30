import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { FormDeactivate } from './../../shared/class/FormDeactivate';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanDeactivate<FormDeactivate> {

  constructor(
    private router: Router
  ) { }

  canLoad(route: Route): boolean {
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }

  canDeactivate(
    component: FormDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('MIRO: core/guards/AuthGuard...');

    return true;
  }

}
