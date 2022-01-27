import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinboardComponent } from './joinboard.component';

describe('JoinboardComponent', () => {
  let component: JoinboardComponent;
  let fixture: ComponentFixture<JoinboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
