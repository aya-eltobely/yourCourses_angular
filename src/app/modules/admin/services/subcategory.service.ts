import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private apiUrl = `https://localhost:44341/api/Admin/subCategory`;

  constructor(private httpclient:HttpClient) { }

  getSubCategories()
  {
    return this.httpclient.get(this.apiUrl);
  }

  addSubCategory(subcat:Subcategory)
  {
    return this.httpclient.post(this.apiUrl , subcat);
  }

  editSubCategory(id:number,subcat:Subcategory)
  {
    return this.httpclient.put(`${this.apiUrl}/${id}` , subcat);
  }

  deleteSubCategory(id:number)
  {
    return this.httpclient.delete(`${this.apiUrl}/${id}`);
  }

}
