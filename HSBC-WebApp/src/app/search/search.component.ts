import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  options: string[];
  selectedOptions: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAtmOptions().subscribe(data => this.options = data);
  }

}
