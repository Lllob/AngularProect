import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListListComponent } from './my-list-list.component';

describe('MyListListComponent', () => {
  let component: MyListListComponent;
  let fixture: ComponentFixture<MyListListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyListListComponent]
    });
    fixture = TestBed.createComponent(MyListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
