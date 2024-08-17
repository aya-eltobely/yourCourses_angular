import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../models/category';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Subcategory } from '../../../models/subcategory';


@Component({
  selector: 'app-subcategory-add-edit',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,ReactiveFormsModule,MatButton,MatSelectModule,CommonModule],
  templateUrl: './subcategory-add-edit.component.html',
  styleUrl: './subcategory-add-edit.component.scss'
})
export class SubcategoryAddEditComponent implements OnInit,OnDestroy {

  unsubscribeAll = new Subject();
  subcategoryForm!:FormGroup;
  allCategory!:Category[];

  constructor(private FB:FormBuilder,public dialogRef: MatDialogRef<SubcategoryAddEditComponent>,private categoryService:CategoryService,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.inatializeForm(this.data);
    this.getAllCAtegory();
  }

  inatializeForm(data:Subcategory)
  {
    this.subcategoryForm = this.FB.group(
      {
        name_en: [ [ data?.name_en ||null],Validators.required],
        name_ar: [[ data?.name_ar ||null],Validators.required],
        categoryId: [[ data?.categoryId ||null],Validators.required],
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

