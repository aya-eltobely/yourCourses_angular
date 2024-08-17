import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = `https://localhost:44341/api/Admin/student`;

  constructor(private http:HttpClient) { }

  getAllStudents()
  {
    return this.http.get(this.apiUrl);
  }

  getAllInactiveStudents()
  {
    return this.http.get(`${this.apiUrl}/Inactive`);
  }

  deactiveStudent(id:number)
  {
    return this.http.put(`${this.apiUrl}/${id}`,'')
  }

  deleteStudent(id:number)
  {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  
}
