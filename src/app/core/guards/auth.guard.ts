import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router); 
  let Toastr:any = inject(ToastrService)

  let currentUrlRoles = route.data['allowedRoles'] // 'EX => ['Teacher','Admin']'
  let currentUserRole = JSON.parse(localStorage.getItem('roles')!); // 'EX => Teacher this string type'
  // currentUrlRoles.includes(currentUserRole) this if it was array and u try to match this with string
  
  if( localStorage.getItem('token') && JSON.parse(localStorage.getItem('isActivate') || '' ) == 1 && currentUserRole == currentUrlRoles )
  {    
    return true;
  }
  else
  {
    Toastr.error('You Are Not Authorized')
    router.navigate(['/unauthorized'])
    return false;
  }


  

};
