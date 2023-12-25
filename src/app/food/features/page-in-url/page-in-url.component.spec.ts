import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInUrlComponent } from './page-in-url.component';

describe('PageInUrlComponent', () => {
  let component: PageInUrlComponent;
  let fixture: ComponentFixture<PageInUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageInUrlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageInUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
