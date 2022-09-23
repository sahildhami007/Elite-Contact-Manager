import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpImageComponent } from './dp-image.component';

describe('DpImageComponent', () => {
  let component: DpImageComponent;
  let fixture: ComponentFixture<DpImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
