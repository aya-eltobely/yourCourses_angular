import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButtonModule,  MatDialogActions],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {

  title!:string;

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.title = this.data;
  }

  onDeleteData(){
    this.dialogRef.close(true)
  }

  onClose(){
    this.dialogRef.close(false)
  }


}
