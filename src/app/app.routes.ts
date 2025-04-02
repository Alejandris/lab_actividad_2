import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { EventsComponent } from '../pages/client/events/events.component';
import { ActivitiesComponent } from '../pages/client/activities/activities.component';
import { OffersComponent } from '../pages/client/offers/offers.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { RoomsComponent } from '../pages/admin/rooms/rooms.component';
import { RoomslistComponent } from '../pages/client/roomslist/roomslist.component';
import { BuscadorComponent } from '../pages/client/buscador/buscador.component';
import { GeolocalizacionComponent } from '../pages/client/geolocalizacion/geolocalizacion.component';
import { GeolocalizaciionadminComponent } from '../pages/admin/geolocalizaciionadmin/geolocalizaciionadmin.component';
import { AdminLayoutComponent } from '../pages/admin/admin-layout/admin-layout.component';




export const routes :Routes =[
  { path: '', redirectTo: '/Home', pathMatch: 'full' } ,
  { path: '', component: HomeComponent },  
  { path: 'Home', component: HomeComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'events', component: EventsComponent},
  {path: 'activities', component: ActivitiesComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'roomslist', component: RoomslistComponent},
  {path: 'scrape', component: BuscadorComponent},
  {path: 'ubications', component: GeolocalizacionComponent},
 
  {path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {path: '/admin/rooms', component: RoomsComponent},
      {path: 'admin/ubicationsadmin', component: GeolocalizaciionadminComponent},
    ]
  },
    { path: '**', redirectTo: 'Home' }
];
  