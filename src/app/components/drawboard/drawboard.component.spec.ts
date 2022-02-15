import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawboardComponent } from './drawboard.component';

describe('ZeichenflaecheComponent', () => {
  let component: DrawboardComponent;
  let fixture: ComponentFixture<DrawboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
