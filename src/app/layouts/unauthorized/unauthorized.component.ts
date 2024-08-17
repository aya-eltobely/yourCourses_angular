import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

  constructor(private router:Router) {
    
  }
  onBack()
  {
    if( JSON.parse(localStorage.getItem('roles')!) == 'Admin' )
    {
      this.router.navigate(['/adminHome'])
    }
    else if(JSON.parse(localStorage.getItem('roles')!) == 'Teacher' )
    {
      this.router.navigate(['/teacherHome'])
    }
    else if(JSON.parse(localStorage.getItem('roles')!) == 'Student' )
    {
      this.router.navigate(['/studentHome'])
    }
    
    // history.back()
  }

}
