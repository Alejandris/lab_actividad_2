import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { LanguageService } from '../../service/languageService';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: true,
})
export class FooterComponent {

  constructor(public languageService : LanguageService) { }
  
    onChange(event: Event) {
      const lang = (event.target as HTMLSelectElement).value;
      this.languageService.setLanguage(lang);
    }
}
