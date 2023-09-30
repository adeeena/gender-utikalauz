import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgeszteronKalkulatorComponent } from './progeszteron-kalkulator.component';

describe('ProgeszteronKalkulatorComponent', () => {
  let component: ProgeszteronKalkulatorComponent;
  let fixture: ComponentFixture<ProgeszteronKalkulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgeszteronKalkulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgeszteronKalkulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
