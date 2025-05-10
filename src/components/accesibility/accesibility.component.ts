import { Component, OnInit, Renderer2 } from '@angular/core';
import { AccessibilityService } from '../../service/accesibility.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accesibility',
  imports: [],
  templateUrl: './accesibility.component.html',
  styleUrl: './accesibility.component.css'
})
export class AccesibilityComponent{
  
  constructor(private accessibilityService: AccessibilityService) {}

  increaseFontSize(): void {
    this.accessibilityService.increaseFontSize();
  }

  decreaseFontSize(): void {
    this.accessibilityService.decreaseFontSize();
  }

  toggleContrast(): void {
    this.accessibilityService.toggleContrast();
  }
}