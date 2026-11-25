import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsztrogenKalkulatorComponent } from '@components/osztrogen-kalkulator/osztrogen-kalkulator';

describe('OsztrogenKalkulatorComponent', () => {
  let component: OsztrogenKalkulatorComponent;
  let fixture: ComponentFixture<OsztrogenKalkulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsztrogenKalkulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsztrogenKalkulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
