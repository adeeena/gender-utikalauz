import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexikonComponent } from '@components/lexikon/lexikon';

describe('LexikonComponent', () => {
  let component: LexikonComponent;
  let fixture: ComponentFixture<LexikonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexikonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LexikonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
