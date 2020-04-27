import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoleFormComponent } from './delete-role-form.component';

describe('DeleteRoleFormComponent', () => {
  let component: DeleteRoleFormComponent;
  let fixture: ComponentFixture<DeleteRoleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRoleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
