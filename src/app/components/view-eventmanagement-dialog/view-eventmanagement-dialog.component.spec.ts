import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventmanagementDialogComponent } from './view-eventmanagement-dialog.component';

describe('ViewEventmanagementDialogComponent', () => {
  let component: ViewEventmanagementDialogComponent;
  let fixture: ComponentFixture<ViewEventmanagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEventmanagementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventmanagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
