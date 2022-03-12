import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawAppComponent } from './draw-app.component';

describe('DrawAppComponent', () => {
  let component: DrawAppComponent;
  let fixture: ComponentFixture<DrawAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
