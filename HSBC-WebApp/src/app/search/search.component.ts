import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchModified: EventEmitter<SearchModel>;

  searchObject: SearchModel;
  options: string[];
  
  constructor(private dataService: DataService) { 
    this.searchObject = new SearchModel();
    this.searchModified = new EventEmitter();
  }

  ngOnInit() {
    this.dataService.getAtmOptions().subscribe(data => this.options = data);
  }

  onSearchChange(value: string) {
    this.searchObject.text = value;
    console.log(value);
    this.modelChanged();
  }

  modelChanged() {
    this.searchModified.emit(this.searchObject);
  }
}
