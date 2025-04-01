import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { RoomsComponent } from '../pages/admin/rooms/rooms.component';
import { RoomslistComponent } from '../pages/client/roomslist/roomslist.component';
import { BuscadorComponent } from '../pages/client/buscador/buscador.component';
import { GeolocalizacionComponent } from '../pages/client/geolocalizacion/geolocalizacion.component';
import { GeolocalizaciionadminComponent } from '../pages/admin/geolocalizaciionadmin/geolocalizaciionadmin.component';




export const appRoutes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },  
  { path: 'Home', component: HomeComponent },
  {path: 'register', component: RegisterComponent},




  
  {path: 'login', component: LoginComponent},
  {path: 'rooms', component: RoomsComponent},
  {path: 'roomslist', component: RoomslistComponent},
  {path: 'scrape', component: BuscadorComponent},
  {path: 'ubications', component: GeolocalizacionComponent},
  {path: 'ubicationsadmin', component: GeolocalizaciionadminComponent},
  { path: '**', redirectTo: 'Home' }
];
