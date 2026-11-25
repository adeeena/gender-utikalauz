import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighamHiszterektomiaVervesztesegKalkulatorComponent } from '@components/higham-hiszterektomia-verveszteseg-kalkulator/higham-hiszterektomia-verveszteseg-kalkulator';

describe('HighamHiszterektomiaVervesztesegKalkulatorComponent', () => {
  let component: HighamHiszterektomiaVervesztesegKalkulatorComponent;
  let fixture: ComponentFixture<HighamHiszterektomiaVervesztesegKalkulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighamHiszterektomiaVervesztesegKalkulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighamHiszterektomiaVervesztesegKalkulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
