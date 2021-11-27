import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HSBC WebApp';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('hr');
  }

  setLang(lang: string) {
    this.translate.setDefaultLang(lang);
  }
}
