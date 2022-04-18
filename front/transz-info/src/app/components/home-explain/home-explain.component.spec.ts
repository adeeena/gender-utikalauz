import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExplainComponent } from './home-explain.component';

describe('HomeExplainComponent', () => {
  let component: HomeExplainComponent;
  let fixture: ComponentFixture<HomeExplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeExplainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
