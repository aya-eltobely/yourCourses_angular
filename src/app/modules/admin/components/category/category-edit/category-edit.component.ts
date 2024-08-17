import { Component, Inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,ReactiveFormsModule,MatButton],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {


  categoryForm!:FormGroup;

  constructor(private FB:FormBuilder,public dialogRef: MatDialogRef<CategoryEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.inatializeForm(this.data);
  }

  inatializeForm(data:Category)
  {
    this.categoryForm = this.FB.group(
      {
        name_en: [data.name_en,Validators.required],
        name_ar: [data.name_ar,Validators.required]
      }
    )
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

