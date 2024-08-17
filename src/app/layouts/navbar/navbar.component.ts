import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,MatIconModule,MatButtonModule,CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
 

  islogged:boolean=false;
  adminName!:any;

  constructor(private router:Router) {
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
    {
      this.islogged=true
    }
    else
    {
      this.islogged=false
    }


    const token:any  = localStorage.getItem('token');
    const decodedToken = jwtDecode( token ) as { [key: string]: string | number };

    this.adminName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }


  onlogout()
  {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])

  }


}
