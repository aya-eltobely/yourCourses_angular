import { CommonModule, JsonPipe, KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shared-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,KeyValuePipe
    ,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule,TitleCasePipe],
  templateUrl: './shared-form.component.html',
  styleUrl: './shared-form.component.scss'
})
export class SharedFormComponent  {

  form!:FormGroup
  x = new FormControl('',Validators.required)
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<SharedFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.initializeForm(data.form)
  }


  initializeForm(form:any){
      this.form = this.fb.group({})
      for(let control in this.data.form){ // control => {nameEn , nameEr]
        this.form.addControl(control,new FormControl(this.data.form[control].value,this.data.form[control].Validators))
      }
      console.log(this.form);
      
  }

  showName(key:string):string{
    return this.data.form[key].displayName
  }

  onSave(){
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value)
    }else{
      return;
    }
  }

  onClose(){
    this.dialogRef.close(false)
  }


}
