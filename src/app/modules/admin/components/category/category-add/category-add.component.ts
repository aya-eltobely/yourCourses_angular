import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,ReactiveFormsModule,MatButton],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent implements OnInit {


  categoryForm!:FormGroup;

  constructor(private FB:FormBuilder,public dialogRef: MatDialogRef<CategoryAddComponent>) {}

  ngOnInit(): void {
    this.inatializeForm();
  }

  inatializeForm()
  {
    this.categoryForm = this.FB.group(
      {
        name_en: [null,Validators.required],
        name_ar: [null,Validators.required]
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

  onClose()
  {
    this.dialogRef.close()
  }

}
