import { Component, OnInit } from '@angular/core';
import { StoreModule } from '../../modules/store/store.module';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor(private store: StoreModule, public sanitizer: DomSanitizer) {}
  
  weatherInfo = "";
  weatherAnimationLink = "";
  days = [];

  async getWeatherInfo() {
    const resp = await fetch('https://localhost:5001/api/profile/weather/' + this.store.location);
    const data = await resp.json();
    this.weatherInfo = data;
  }

  calcAverageTemp(maxTemp, minTemp){
    let mxTemp = parseInt(maxTemp);
    let mnTemp = parseInt(minTemp);
    let average = (mxTemp + mnTemp) / 2;
    return String(average);
  }

  async getGeoInfo() {
    const resp = await fetch('https://localhost:5001/api/profile/locations/' + this.store.location);
    const data = await resp.json();
    this.weatherAnimationLink = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=" + data.Latitude + "&lng=" + data.Longitude + "&overname=2&zoom=8&naam=leewarden&size=2&voor=1";
    //this.weatherAnimationLink = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=53.20139&lng=5.80859&overname=2&zoom=8&naam=leewarden&size=2b&voor=1";//console.log(this.weatherAnimationLink);
  }

  getDays() {
    var regex = /\w*\s\w*\s\d*\s\d*/i;

    var d0 = new Date();
    this.days.push(d0.toString().match(regex));

    var d1 = new Date();
    d1.setDate(d1.getDate() + 1);
    this.days.push(d1.toString().match(regex));

    var d2 = new Date();
    d2.setDate(d2.getDate() + 2);
    this.days.push(d2.toString().match(regex));

  }

  ngOnInit() {
    this.getWeatherInfo();
    this.getGeoInfo();
    this.getDays();
  }

}
