import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPreviewItemComponent } from './entry-preview-item.component';

describe('EntryPreviewItemComponent', () => {
  let component: EntryPreviewItemComponent;
  let fixture: ComponentFixture<EntryPreviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryPreviewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPreviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
