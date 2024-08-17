import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `https://localhost:44341/api/Admin/category`;

  constructor(private httpclient:HttpClient) { }

  getCategories()
  {
    return this.httpclient.get(this.apiUrl);
  }

  addCategory(cat:Category)
  {
    return this.httpclient.post(this.apiUrl , cat);
  }

  editCategory(id:number,cat:Category)
  {
    return this.httpclient.put(`${this.apiUrl}/${id}` , cat);
  }

  deleteCategory(id:number)
  {
    return this.httpclient.delete(`${this.apiUrl}/${id}`);
  }

}
