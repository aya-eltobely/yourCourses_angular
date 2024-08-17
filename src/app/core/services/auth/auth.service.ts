import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http:HttpClient) { }


  signUp(user:any)
  {
    return this.http.post(`https://localhost:44341/api/Account/register`,user);
  }

  signIn(user:any)
  {
    return this.http.post(`https://localhost:44341/api/Account/login`,user);
  }

}
