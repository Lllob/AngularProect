//ng g g guard

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
//import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


 export const guardGuard: CanActivateFn = (route, state) => {      
  
  const authService = inject(AuthService);
  const router = inject(Router)

  if (authService.isAuthenticated()) { 
    return true;
  } else { //ako ne e lognat
    alert('You can not make it, pleas login')
    router.navigate(['/login'])
    return false; 
  }
};
