import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocalizaciionadminComponent } from './geolocalizaciionadmin.component';

describe('GeolocalizaciionadminComponent', () => {
  let component: GeolocalizaciionadminComponent;
  let fixture: ComponentFixture<GeolocalizaciionadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeolocalizaciionadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeolocalizaciionadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
