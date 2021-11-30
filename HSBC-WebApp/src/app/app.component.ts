import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HSBC WebApp';
  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  setLang(lang: string) {
    this.translate.setDefaultLang(lang);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
