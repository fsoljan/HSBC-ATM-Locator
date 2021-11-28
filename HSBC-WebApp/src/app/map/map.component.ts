import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { DataService } from '../services/data.service';
import { AtmModel } from '../models/atm.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  id = -1;

  constructor(private routes: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.id = params.id
      if (this.id === undefined)
        this.initMap();
      else {
        this.dataService.getAtm(this.id).subscribe(data => {
          this.initMap(data.geoLocation[0], data.geoLocation[1], 18);
        });
      }
    });
  }

  initMap(x: number = 1780206, y: number = 5749983, zoom = 12) {
    this.map = new Map({
      view: new View({
        center: [x, y],
        zoom: zoom,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }
}
