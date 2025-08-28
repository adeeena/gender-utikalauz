import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzovetsegesekComponent } from './szovetsegesek.component';

describe('SzovetsegesekComponent', () => {
  let component: SzovetsegesekComponent;
  let fixture: ComponentFixture<SzovetsegesekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzovetsegesekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SzovetsegesekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
