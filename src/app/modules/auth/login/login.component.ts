import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit , OnDestroy {

  unSubscribeAll = new Subject();
  loginForm!:FormGroup;
 


  constructor(private FB:FormBuilder,private authService:AuthService,private router:Router,private toastr:ToastrService) {}


  ngOnInit(): void {
    this.inatializeLoginForm();
    
  }

  inatializeLoginForm()
  {
    this.loginForm = this.FB.group({
      userName : [null , [Validators.required]],
      password : [null , [Validators.required]]
    })
  }

  onSignIn(){

    if(this.loginForm.valid)
    {
      this.authService.signIn(this.loginForm.value).pipe(
        takeUntil(this.unSubscribeAll)
      ).subscribe((res:any)=>
      {
        const decodedToken = jwtDecode(res.token) as { [key: string]: string | number };
        const isActivate = res.isActivate  ;

        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        localStorage.setItem('token',res.token);
        localStorage.setItem('isActivate',isActivate);
        localStorage.setItem('roles',JSON.stringify(role));
        
        this.loginForm.reset();

        if(role == "Admin")
        {
          this.router.navigate(['/adminHome'])
        }
        else if(role == "Teacher")
        {
          if(isActivate === 0)
          {
            this.router.navigate(['/notActivate'])
          }
          else
          {
            this.router.navigate(['/teacherHome'])
          }
        }
        else if(role == "Student")
        {

        }
        else
        {
          this.toastr.error("Unauthorized");
        }
      })

    }
    else
    {
      this.loginForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
    this.unSubscribeAll.next(null);
    this.unSubscribeAll.complete();
  }


}
