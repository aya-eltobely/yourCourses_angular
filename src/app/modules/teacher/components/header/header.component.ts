import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,MatIconModule,MatButtonModule,CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  islogged:boolean=false;
  teacherName!:any;

  constructor(private router:Router) {}

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

    this.teacherName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }


  onlogout()
  {
    localStorage.clear()
    this.router.navigate(['/login'])
  }


  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
