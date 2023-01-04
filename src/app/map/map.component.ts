import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {Component, Input, OnInit} from '@angular/core';

export const DEFAULT_LAT = 6.240966;
export const DEFAULT_LON =  1.190856;
export const TITRE = 'Position du dev Ibtihadj';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  private map:any;

  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() TITRE: string = TITRE ;



  constructor() {
  }


  ngOnInit(): void {
    this.initMap()
  }


  private initMap(): void {
    //Configuration du map
    this.map = L.map('map', {
      center: [this.lat, this.lon],
      attributionControl: false,
      zoom: 14,
    });

    //Personalisation d'icone
    L.Marker.prototype.options.icon = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    //TITRE
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    });

    //Simple marker pour admin (départ : Université de Lomé, Rue 4, Lomé, Togo)
    const lonDep = 1.211894685489554;
    const latDep = 6.176637212131962;
    const marker = L.marker([latDep, lonDep], {draggable : false}).bindPopup(this.TITRE);
    marker.addTo(this.map);

    //Marker avec cercle en bas pour client (arrivé : Aéroport International Gnassingbé Eyadéma de Lomé Tokoin, Rue Amézian, Lomé, Togo)
    const lonArr = 1.2533379746986828;
    const latArr = 6.170367557144861;
    const mark = L.circleMarker([latArr, lonArr]).addTo(this.map);
    mark.addTo(this.map);


    //ruta
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: true,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(latDep,lonDep),
        L.latLng(latArr, lonArr)
      ],
      useZoomParameter : true
    }).addTo(this.map);
    tiles.addTo(this.map);
  }
}

