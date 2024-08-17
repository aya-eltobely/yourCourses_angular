import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports:  [MatFormFieldModule, MatInputModule, MatSelectModule,MatIconModule,MatRadioModule,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit , OnDestroy{

  constructor(private FB:FormBuilder, private authService:AuthService,private toster:ToastrService,private router:Router) {}

  hidePass = true;
  hideConfirmPass = true;
  unsubscribeAll = new Subject();
  signUpForm!:FormGroup;

  

  ngOnInit(): void {
    this.inatializeForm();
  }

  inatializeForm()
  {
    this.signUpForm = this.FB.group(
      {
        firstName : [null , [Validators.required]],
        lastName : [null , [Validators.required]],
        email : [null , [Validators.required, this.emailValidation()]],
        userName : [null , [Validators.required]],
        password : [null , [Validators.required , Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
        confirmPassword : [null , [Validators.required , Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
        phoneNumber : [null , [Validators.required]],
        userType : [null , [Validators.required]],
      },
      { validators : [this.ConfirmPassFn() ] }
    )

  }

  emailValidation():ValidatorFn
  {
    return ( (control:AbstractControl) : ValidationErrors | null =>
    {
      
      let email = control.value;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(email)) {
        return { invalidEmail: true };
      }
      else 
      {
        return null;
      } 

    } )

  }

  ConfirmPassFn():ValidatorFn
  {
    return ( (control:AbstractControl) : ValidationErrors | null =>
    {
      let pass = control.get('password')?.value;
      let confirmPass = control.get('confirmPassword')?.value;

      if(pass != confirmPass)
      {
        return { isNotMatch : true }
      }
      else
      {
        return null;
      }
    } )

  }

  onSubmit()
  {
    if(this.signUpForm.valid)
    {
      console.log(this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value).pipe(
       takeUntil(this.unsubscribeAll)
      ).subscribe((res:any) => 
        {
          console.log(res);
          this.toster.success(res.message);
        this.router.navigate(['/login']);

        });

    }
    else
    {
      this.signUpForm.markAllAsTouched();      
    }
  }


  clickEventPass(event: MouseEvent) {
    this.hidePass = !this.hidePass;
    // event.stopPropagation();
  }

  clickEventConfirmPass(event: MouseEvent) {
    this.hideConfirmPass = !this.hideConfirmPass; 
    // event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
