import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
 
})


export class AppComponent {
  title = 'frontend';

  constructor(private router: Router) {
    this.router.navigate(['/roomslist']);
  }
  
}
