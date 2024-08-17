import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../models/category';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-subcategory-add',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,ReactiveFormsModule,MatButton,MatSelectModule,CommonModule],
  templateUrl: './subcategory-add.component.html',
  styleUrl: './subcategory-add.component.scss'
})
export class SubcategoryAddComponent implements OnInit,OnDestroy {

  unsubscribeAll = new Subject();

  subcategoryForm!:FormGroup;
  allCategory!:Category[];

  constructor(private FB:FormBuilder,public dialogRef: MatDialogRef<SubcategoryAddComponent>,private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.inatializeForm();
    this.getAllCAtegory();
  }

  inatializeForm()
  {
    this.subcategoryForm = this.FB.group(
      {
        name_en: [null,Validators.required],
        name_ar: [null,Validators.required],
        categoryId: [null,Validators.required],
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

  onAddSubCategory()
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
