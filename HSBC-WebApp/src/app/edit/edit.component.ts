import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AtmModel } from '../models/atm.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  atmOptions: string[];
  atm: AtmModel;
  id: number;
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar, 
    private routes: ActivatedRoute, 
    private dataService: DataService, 
    private translate: TranslateService) 
  { 
    this.atm = new AtmModel();
  }

  ngOnInit() {
    this.routes.params.subscribe(params => {
      this.id = params.id;
      this.dataService.getAtm(this.id).subscribe(data => {
        this.atm = data;
      });
    });

    this.dataService.getAtmOptions().subscribe(data => this.atmOptions = data);
  }

  submit() {
    this.dataService.updateAtm(this.atm).subscribe(
      data => this._snackBar.open(this.translate.instant("update.success"), undefined, {duration: this.durationInSeconds * 1000 }),
      error => this._snackBar.open(this.translate.instant("update.fail"), undefined, {duration: this.durationInSeconds * 1000 }));
  }
}
