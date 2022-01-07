import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeichenflaecheComponent } from './zeichenflaeche.component';

describe('ZeichenflaecheComponent', () => {
  let component: ZeichenflaecheComponent;
  let fixture: ComponentFixture<ZeichenflaecheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeichenflaecheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeichenflaecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
