import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course';
import { ReviewListComponent } from "../review-list/review-list.component";
import { Review } from '../../../models/review';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule, ReviewListComponent],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements AfterViewInit, OnDestroy, OnInit {

  showVirtualScroll = false;


  unsubscribeAll = new Subject();
  allCourses!: Course[];
  allReviews!: Review[];
  displayedColumns: string[] = ['#', 'name_en', 'name_ar','description_ar','description_en','reviews'];
  dataSource = new MatTableDataSource<Course>(this.allCourses);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  teacherId!:number;

  constructor(private teacherService: TeacherService,private route:ActivatedRoute) {
    route.params.subscribe(param=>
      {
        this.teacherId = param['id'];
      })
  }

  ngOnInit(): void {
    this.getAllCourses()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCourses() {
    this.teacherService.getCourses(this.teacherId).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  getReviews(courseId:number)
  {
    this.teacherService.getReviews(courseId).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.allReviews = res;
    });

  }


  toggleSidebar(courseId:number) {
    this.showVirtualScroll = !this.showVirtualScroll;

    this.getReviews(courseId);
  }

  onBack()
  {
    history.back();
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

}

