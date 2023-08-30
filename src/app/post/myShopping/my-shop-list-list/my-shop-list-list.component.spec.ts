import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopListListComponent } from './my-shop-list-list.component';

describe('MyShopListListComponent', () => {
  let component: MyShopListListComponent;
  let fixture: ComponentFixture<MyShopListListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyShopListListComponent]
    });
    fixture = TestBed.createComponent(MyShopListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
