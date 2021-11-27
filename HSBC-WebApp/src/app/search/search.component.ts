import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  options = ["option.contactless", "option.withdraw", "option.deposit", "option.vault", "option.coinDeposit"];
  selectedOptions: string[];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}
