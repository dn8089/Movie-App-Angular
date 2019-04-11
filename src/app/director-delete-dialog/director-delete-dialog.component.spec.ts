import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDeleteDialogComponent } from './director-delete-dialog.component';

describe('DirectorDeleteDialogComponent', () => {
  let component: DirectorDeleteDialogComponent;
  let fixture: ComponentFixture<DirectorDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
