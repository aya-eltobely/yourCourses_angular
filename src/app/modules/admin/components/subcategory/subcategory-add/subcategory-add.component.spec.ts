import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryAddComponent } from './subcategory-add.component';

describe('SubcategoryAddComponent', () => {
  let component: SubcategoryAddComponent;
  let fixture: ComponentFixture<SubcategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
