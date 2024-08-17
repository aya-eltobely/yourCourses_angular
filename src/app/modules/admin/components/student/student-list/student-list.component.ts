import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../models/category';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatIconModule,CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements AfterViewInit, OnDestroy, OnInit {

  constructor(private studentService: StudentService, public dialog: MatDialog, private tostar: ToastrService) {
  }

  unsubscribeAll = new Subject();
  allStudents!: Student[];
  displayedColumns: string[] = ['#', 'name', 'activate','userName','email','phone','action'];
  dataSource = new MatTableDataSource<Student>(this.allStudents);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  studentType!:string;


  ngOnInit(): void {
    this.getAllStudents()
  }


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  getAllStudents() {
    this.studentType="All Student";
    this.studentService.getAllStudents().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  getAllInactiveStudents()
  {
    this.studentType="All Inactive Student";
    this.studentService.getAllInactiveStudents().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.dataSource.data = res;
    })
  }


  onDeactive(enterAnimationDuration: string, exitAnimationDuration: string, id: number) {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: 'Deactive'
    });

    dialogRef.afterClosed().subscribe((res) => {
      //add data to db      
      if (res) {
        console.log(res);

        this.studentService.deactiveStudent(id).subscribe((res: any) => {
          this.tostar.success("Student Deactivated")
          this.getAllStudents()
        })
      }
    })

  }

  onDelete(enterAnimationDuration: string, exitAnimationDuration: string, id: number) {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: 'Delete'
    });

    dialogRef.afterClosed().subscribe((res) => {
      //add data to db      
      if (res) {
        console.log(res);

        this.studentService.deleteStudent(id).subscribe((res: any) => {
          this.tostar.success("Student Deleted")
          this.getAllStudents()
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

}
