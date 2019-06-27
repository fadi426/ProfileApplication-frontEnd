import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '../../modules/store/store.module';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(private store: StoreModule) { }

  events = [];

  async getLocationEvents(url, province) {
    const resp = await fetch(url);
    const data = await resp.json();

    data.forEach((event) => {
      if(!this.containsEvent(event) && event.Title){
        if(province)
          event.Location = this.store.location._province;
        else
          event.Location = this.store.location._name;
        this.events.push(event);
      };
    });
    console.log(this.events);
  }

  containsEvent(event){
    this.events.forEach((e) => {
      if(e.Title == event.Title)
        return true;
    });
    return false;
  }

  openEventLink(url){
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.getLocationEvents('https://localhost:5001/api/profile/locations/' + this.store.location._name + '/events/', false).then(() => {
      this.getLocationEvents('https://localhost:5001/api/profile/locations/' + this.store.location._province + '/events/', true);
    });
  }

}
