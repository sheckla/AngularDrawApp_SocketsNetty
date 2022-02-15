import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawtoolsComponent} from './drawtools.component';

describe('ZeichentoolsComponent', () => {
  let component: DrawtoolsComponent;
  let fixture: ComponentFixture<DrawtoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawtoolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
