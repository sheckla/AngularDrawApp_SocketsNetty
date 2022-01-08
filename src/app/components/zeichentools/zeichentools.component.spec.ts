import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeichentoolsComponent } from './zeichentools.component';

describe('ZeichentoolsComponent', () => {
  let component: ZeichentoolsComponent;
  let fixture: ComponentFixture<ZeichentoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeichentoolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeichentoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
