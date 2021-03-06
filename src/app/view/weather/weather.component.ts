import { Component, OnInit } from '@angular/core';
import { StoreModule } from '../../modules/store/store.module';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor(public store: StoreModule, public sanitizer: DomSanitizer) {}
  
  weatherInfo = "";
  weatherAnimationLink = "";
  days = [];

  async getWeatherInfo() {
    const resp = await fetch('https://profileapplicationapi.azurewebsites.net/api/profile/locations/' + this.store.location._name + "/weather");
    const data = await resp.json();
    this.weatherInfo = data;
  }

  calcAverageTemp(maxTemp, minTemp){
    let mxTemp = parseInt(maxTemp);
    let mnTemp = parseInt(minTemp);
    let average = (mxTemp + mnTemp) / 2;
    return String(average);
  }

  getGeoInfo() {
    this.weatherAnimationLink = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=" + this.store.location._latitude + "&lng=" + this.store.location._longitude + "&overname=2&zoom=8&naam=leewarden&size=2&voor=1";
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
