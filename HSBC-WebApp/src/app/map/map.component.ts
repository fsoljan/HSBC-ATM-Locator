import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { DataService } from '../services/data.service';
import { AtmModel } from '../models/atm.model';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj.js';
import Point from 'ol/geom/Point';
import { from } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  atms: AtmModel[];
  map: Map;
  id = -1;

  constructor(private routes: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllAtms().subscribe(data => {
      this.atms = data;
      this.routes.params.subscribe(params => {
        this.id = params.id
        if (this.id === undefined)
          this.initMap();
        else {
          this.dataService.getAtm(this.id).subscribe(data => {
            this.initMap(data.geoLocation, 18);
          });
        }
      });
    });
  }

  initMap(lonLat = [15.991406,45.810100], zoom = 12) {
    let vectorSource = new VectorSource({
      features: []
    });

    for (let atm of this.atms) {
      let atmFeature = new Feature({
        geometry: new Point(fromLonLat(atm.geoLocation))
      });

      atmFeature.setStyle(new Style({
        image: new Icon(({
          color: '#8959A8',
          crossOrigin: 'anonymous',
          src: 'assets/images/pin.png'
        }))
      }));
      
      vectorSource.addFeature(atmFeature);
    }

    let vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map = new Map({
      view: new View({
        center: fromLonLat(lonLat),
        zoom: zoom,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer
      ],
      target: 'ol-map'
    });
  }
}
