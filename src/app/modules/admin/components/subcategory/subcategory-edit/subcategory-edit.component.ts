import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../models/category';
import { Subcategory } from '../../../models/subcategory';
import { CategoryService } from '../../../services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-subcategory-edit',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,ReactiveFormsModule,MatButton,CommonModule,MatSelectModule],
  templateUrl: './subcategory-edit.component.html',
  styleUrl: './subcategory-edit.component.scss'
})
export class SubcategoryEditComponent implements OnInit,OnDestroy {

  unsubscribeAll = new Subject();
  subcategoryForm!:FormGroup;
  allCategory!:Category[];

  constructor(private FB:FormBuilder,public dialogRef: MatDialogRef<SubcategoryEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.inatializeForm(this.data);
    this.getAllCAtegory();

  }

  inatializeForm(data:Subcategory)
  {
    console.log(data);
    
    this.subcategoryForm = this.FB.group(
      {
        name_en: [data.name_en,Validators.required],
        name_ar: [data.name_ar,Validators.required],
        categoryId: [data.categoryId,Validators.required],
      }
    )
  }

  getAllCAtegory()
  {
    this.categoryService.getCategories().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.allCategory = res;
    })

  }

  onEditSubCategory()
  {
    if(this.subcategoryForm.invalid)
    {
      this.subcategoryForm.markAllAsTouched() 
    }     
    else
    {
      this.dialogRef.close(this.subcategoryForm.value);
    }
  }

  onClose()
  {
    this.dialogRef.close()
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
