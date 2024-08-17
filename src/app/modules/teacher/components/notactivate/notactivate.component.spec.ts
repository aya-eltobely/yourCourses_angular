import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotactivateComponent } from './notactivate.component';

describe('NotactivateComponent', () => {
  let component: NotactivateComponent;
  let fixture: ComponentFixture<NotactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotactivateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
