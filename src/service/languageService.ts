import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  currentLang: string = 'es';
  options = [
    { value: 'es', display: 'Español' },
    { value: 'en', display: 'English' }
  ];

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'es';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    console.log('Setting language to : ${lang}', lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLang = lang;
  }

  getLanguage() {
    return this.currentLang;
  }

  getOptions() {
    return this.options;
  }
}
