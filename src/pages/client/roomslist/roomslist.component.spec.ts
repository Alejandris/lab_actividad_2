import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomslistComponent } from './roomslist.component';

describe('RoomslistComponent', () => {
  let component: RoomslistComponent;
  let fixture: ComponentFixture<RoomslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
