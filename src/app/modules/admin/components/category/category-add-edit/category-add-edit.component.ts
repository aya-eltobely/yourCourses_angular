import { Component, Inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-add-edit',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,ReactiveFormsModule,MatButton],
  templateUrl: './category-add-edit.component.html',
  styleUrl: './category-add-edit.component.scss'
})
export class CategoryAddEditComponent implements OnInit {


  categoryForm!:FormGroup;

  constructor(private FB:FormBuilder,public dialogRef: MatDialogRef<CategoryAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data);
    
    this.inatializeForm(this.data);
  }

  inatializeForm(data:Category)
  {
    this.categoryForm = this.FB.group(
      {
        name_en: [ [data?.name_en||null],Validators.required],
        name_ar: [ [data?.name_ar||null],Validators.required]
      }
    )
  }

  onAddCategory()
  {
    if(this.categoryForm.invalid)
    {
      this.categoryForm.markAllAsTouched() 
    }     
    else
    {
      this.dialogRef.close(this.categoryForm.value);
    }
  }

  onEditCategory()
  {
    if(this.categoryForm.invalid)
    {
      this.categoryForm.markAllAsTouched() 
    }     
    else
    {
      this.dialogRef.close(this.categoryForm.value);
    }
  }

  onClose()
  {
    this.dialogRef.close()
  }

}
