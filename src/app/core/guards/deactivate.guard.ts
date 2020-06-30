import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FormDeactivate } from './../../shared/class/FormDeactivate';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<FormDeactivate> {

  constructor() { }

  canDeactivate(
    component: FormDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('MIRO: core/guards/DeactivateGuard');

    return true;
  }

}
