import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesztoszteronKalkulatorComponent } from './tesztoszteron-kalkulator.component';

describe('TesztoszteronKalkulatorComponent', () => {
  let component: TesztoszteronKalkulatorComponent;
  let fixture: ComponentFixture<TesztoszteronKalkulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesztoszteronKalkulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesztoszteronKalkulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
