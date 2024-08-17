import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  apiUrl = `https://localhost:44341/api/Admin/teacher`;
  
  constructor(private http:HttpClient) { }

  getAllTeachers()
  {
    return this.http.get(this.apiUrl);
  }

  activeTeacher(id:number)
  {
    return this.http.put(`${this.apiUrl}/activate/${id}`,'');
  }

  deleteTeacher(id:number)
  {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCourses(teacherId:number)
  {
    return this.http.get(`${this.apiUrl}/courses/${teacherId}`);
  }

  getReviews(courseId:number)
  {
    return this.http.get(`${this.apiUrl}/review/${courseId}`);
  }


}
