import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  options = ["Isplatni bankomat", "Uplatni bankomat", "Noćni trezor", "Kovinomat"];

  constructor() { }

  ngOnInit() {
  }

}
