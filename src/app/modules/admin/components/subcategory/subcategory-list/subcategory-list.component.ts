import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog,} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from '../../../services/subcategory.service';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryAddComponent } from '../subcategory-add/subcategory-add.component';
import { SubcategoryEditComponent } from '../subcategory-edit/subcategory-edit.component';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { SubcategoryAddEditComponent } from '../subcategory-add-edit/subcategory-add-edit.component';


@Component({
  selector: 'app-subcategory-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.scss'
})
export class SubcategoryListComponent implements AfterViewInit, OnDestroy, OnInit {

  constructor(private subcategoryService: SubcategoryService, public dialog: MatDialog,private tostar:ToastrService) {
  }

  unsubscribeAll = new Subject();
  allsubcategories!: Subcategory[];
  displayedColumns: string[] = ['#', 'name_en' , 'name_ar','categoryName_en','categoryName_ar', 'action'];
  dataSource = new MatTableDataSource<Subcategory>(this.allsubcategories);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getAllSubCategories()
  }


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  getAllSubCategories() {
    this.subcategoryService.getSubCategories().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((res: any) => {
      this.dataSource.data = res;
    })
  }


  onAdd(enterAnimationDuration: string, exitAnimationDuration: string) {

    const dialogRef = this.dialog.open(SubcategoryAddEditComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe( (res)=>
    {
      //add data to db      
      if(res)
      {        
        this.subcategoryService.addSubCategory(res).subscribe( (res:any) => 
        {
          this.tostar.success("SubCategory Created")
          this.getAllSubCategories()
        } )
      }
    } )

  }

  onEdit(enterAnimationDuration: string, exitAnimationDuration: string,subcategory:Subcategory) {

    const dialogRef = this.dialog.open(SubcategoryAddEditComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data:subcategory
    });

    dialogRef.afterClosed().subscribe( (res)=>
    {
      //add data to db      
      if(res)
      {
        console.log(res);
        
        this.subcategoryService.editSubCategory(subcategory.id,res).subscribe( (res:any) => 
        {
          this.tostar.success("SubCategory Updated")
          this.getAllSubCategories()
        } )
      }
    } )

  }

  onDelete(enterAnimationDuration: string, exitAnimationDuration: string,subcategoryId:number) {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data:'Delete'
    });

    dialogRef.afterClosed().subscribe( (res)=>
    {
      //add data to db      
      if(res)
      {
        console.log(res);
        
        this.subcategoryService.deleteSubCategory(subcategoryId).subscribe( (res:any) => 
        {
          this.tostar.success("Sub Category Deleted")
          this.getAllSubCategories()
        } )
      }
    } )

  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

}
