import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSortAppartPage } from './modal-sort-appart.page';

describe('ModalSortAppartPage', () => {
  let component: ModalSortAppartPage;
  let fixture: ComponentFixture<ModalSortAppartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSortAppartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSortAppartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
