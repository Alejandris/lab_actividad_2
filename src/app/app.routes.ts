import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { EventsComponent } from '../pages/events/events.component';
import { ActivitiesComponent } from '../pages/activities/activities.component';
import { OffersComponent } from '../pages/offers/offers.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { RoomsComponent } from '../pages/admin/rooms/rooms.component';
import { RestaurantsComponent } from '../pages/restaurants/restaurants.component';
import { RoomslistComponent } from '../pages/client/roomslist/roomslist.component';
import { BuscadorComponent } from '../pages/client/buscador/buscador.component';
import { GeolocalizacionComponent } from '../pages/client/geolocalizacion/geolocalizacion.component';
import { GeolocalizaciionadminComponent } from '../pages/admin/geolocalizaciionadmin/geolocalizaciionadmin.component';




export const appRoutes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },  
  { path: 'Home', component: HomeComponent },
  { path: 'Events', component: EventsComponent },
  { path: 'Offers', component: OffersComponent },
  { path: 'Restaurants', component: RestaurantsComponent },
  { path: 'Activities', component: ActivitiesComponent },
  {path: 'register', component: RegisterComponent},




  
  {path: 'login', component: LoginComponent},
  {path: 'rooms', component: RoomsComponent},
  {path: 'roomslist', component: RoomslistComponent},
  {path: 'scrape', component: BuscadorComponent},
  {path: 'ubications', component: GeolocalizacionComponent},
  {path: 'ubicationsadmin', component: GeolocalizaciionadminComponent},
  { path: '**', redirectTo: 'Home' }
];
