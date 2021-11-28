import { Component, Input, OnInit } from '@angular/core';
import { AtmModel } from '../models/atm.model';
import { SearchModel } from '../models/search.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchObject: SearchModel;
  atms = [] as AtmModel[];
  filteredAtms = [] as AtmModel[];

  constructor(private dataService: DataService) { 
    this.searchObject = new SearchModel();
    this.dataService.getAllAtms().subscribe(data => {
      this.atms = data;
      this.filteredAtms = data;
    });
  }

  ngOnInit() {
  }

  searchModified(object: SearchModel) {
    this.searchObject = object;
    this.filteredAtms = this.atms.filter(atm => this.doFilter(atm));
  }

  doFilter(atm: AtmModel): boolean {
    if (atm.address.toUpperCase().indexOf(this.searchObject.text.toUpperCase()) == -1)
      return false;

    for(let option of this.searchObject.selectedOptions) {
      if (atm.options.indexOf(option) == -1)
        return false;
    }

    if (this.searchObject.isOpen && !atm.isCurrentlyOpen())
      return false;

    return true;
  }
}
