import { Component, OnInit } from '@angular/core';
import { StoreModule } from '../../modules/store/store.module';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor(private store: StoreModule) {}
  
  weatherInfo = "";

  async getWeatherInfo() {
    const resp = await fetch('https://localhost:5001/api/profile/weather/' + this.store.location);
    const data = await resp.json();
    console.log(data);
    this.weatherInfo = data;
  }

  calcAverageTemp(maxTemp, minTemp){
    let mxTemp = parseInt(maxTemp);
    let mnTemp = parseInt(minTemp);
    let average = (mxTemp + mnTemp) / 2;
    return String(average);
  }

  ngOnInit() {
    this.getWeatherInfo();
  }

}
