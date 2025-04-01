// accessibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private fontSizeSubject = new BehaviorSubject<number>(1);  // El valor inicial es el tamaño de fuente normal
  fontSize$ = this.fontSizeSubject.asObservable();

  private highContrast = new BehaviorSubject<boolean>(false); // Contraste por defecto (normal)
  isHighContrast$ = this.highContrast.asObservable();

  private readonly maxFontSize = 1.5;
  private readonly minFontSize = 0.75;

  constructor() {}
  private getSavedFontSize(): number {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? +savedFontSize : 1;  // Valor por defecto: 1 (normal)
  }

  private getSavedContrast(): boolean {
    const savedContrast = localStorage.getItem('highContrast');
    return savedContrast === 'true'; // Valor por defecto: false
  }

  saveFontSize(fontSize: number): void {
    localStorage.setItem('fontSize', fontSize.toString());
  }

  saveContrast(isHighContrast: boolean): void {
    localStorage.setItem('highContrast', isHighContrast.toString());
  }
  increaseFontSize(): void {
    let currentFontSize = this.fontSizeSubject.getValue();
    if (currentFontSize < this.maxFontSize) {
      this.fontSizeSubject.next(currentFontSize + 0.25);
    }
  }

  decreaseFontSize(): void {
    let currentFontSize = this.fontSizeSubject.getValue();
    if (currentFontSize > this.minFontSize) {
      this.fontSizeSubject.next(currentFontSize - 0.25);
    }
  }

  toggleContrast(): void {
    // Alternar entre alto contraste y normal
    this.highContrast.next(!this.highContrast.value);
  }
} 
