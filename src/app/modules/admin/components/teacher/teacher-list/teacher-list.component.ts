import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher';
import {  Router } from '@angular/router';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatIconModule,CommonModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss'
})
export class TeacherListComponent implements AfterViewInit, OnDestroy, OnInit {

  constructor(private teacherService: TeacherService, public dialog: MatDialog, private tostar: ToastrService,private router:Router) {
  }

  unsubscribeAll = new Subject();
  allTeachers!: Teacher[];
  displayedColumns: string[] = ['#', 'name', 'activate','userName','email','phone','courses','action'];
  dataSource = new MatTableDataSource<Teacher>(this.allTeachers);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getAllTeachers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  getCourses(teacherId:number)
  {
    this.router.navigate([`/adminHome/coursesList/${teacherId}`]);

    // this.teacherService.getCourses(teacherId).pipe(
    //   takeUntil(this.unsubscribeAll)
    // ).subscribe((res: any) => {
    //   console.log(res)
    // });

  }

  onActivate(enterAnimationDuration: string, exitAnimationDuration: string, id: number) {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: 'Activate'
    });

    dialogRef.afterClosed().subscribe((res) => {
      //add data to db      
      if (res) {
        console.log(res);

        this.teacherService.activeTeacher(id).subscribe((res: any) => {
          this.tostar.success("Teacher Activated")
          this.getAllTeachers()
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

        this.teacherService.deleteTeacher(id).subscribe((res: any) => {
          this.tostar.success("Teacher Deleted")
          this.getAllTeachers()
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

}

