import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  supportLanguages = ['tr', 'en'];

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('tr');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang as any);
  }

  ngOnInit(): void {

  }

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }


}
