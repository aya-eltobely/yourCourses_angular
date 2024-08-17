import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { CategoryAddEditComponent } from '../category-add-edit/category-add-edit.component';
import { SharedFormComponent } from '../../../../../shared/components/shared-form/shared-form.component';
import { Validators } from '@angular/forms';
import { FormConfig } from '../../../../../shared/components/shared-form/form-config';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatIconModule,],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements AfterViewInit, OnDestroy, OnInit {

  constructor(private categoryService: CategoryService, public dialog: MatDialog, private tostar: ToastrService) {
  }

  unsubscribeAll = new Subject();
  allcategories!: Category[];
  displayedColumns: string[] = ['#', 'name_en', 'name_ar', 'action'];
  dataSource = new MatTableDataSource<Category>(this.allcategories);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getAllCategories()
  }


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  getAllCategories() {
    this.categoryService.getCategories().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.dataSource.data = res;
    })
  }


  onAdd(enterAnimationDuration: string, exitAnimationDuration: string) {
    const formConfig:FormConfig = {
      name_en:{
        value:'',
        Validators:[Validators.required],
        displayName: 'English Name',
      },
      name_ar:{
        value:'',
        Validators:[Validators.required],
        displayName: 'Arabic Name',
      }
    }

    const dialogRef = this.dialog.open(SharedFormComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        title:'Add Category',
        form: formConfig
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      //add data to db      
      if (res) {
        console.log(res);

        this.categoryService.addCategory(res).subscribe((res: any) => {
          this.tostar.success("Category Created")
          this.getAllCategories()
        })
      }
    })

  }

  onEdit(enterAnimationDuration: string, exitAnimationDuration: string, category: Category) {
    const formConfig:FormConfig = {
      name_en:{
        value: category.name_en,
        Validators:[Validators.required],
        displayName: 'English Name',
      },
      name_ar:{
        value: category.name_ar,
        Validators:[Validators.required],
        displayName: 'Arabic Name',
      }
    }
    const dialogRef = this.dialog.open(SharedFormComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Edit Category',
        form: formConfig
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      //add data to db      
      if (res) {
        let obj = {...category,...res}
        this.categoryService.editCategory(category.id, obj).subscribe((res: any) => {
          this.tostar.success("Category Updated")
          this.getAllCategories()
        })
      }
    })

  }

  onDelete(enterAnimationDuration: string, exitAnimationDuration: string, categoryId: number) {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: 'Delete'
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.categoryService.deleteCategory(categoryId).subscribe((res: any) => {
          this.tostar.success("Category Deleted")
          this.getAllCategories()
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

}
