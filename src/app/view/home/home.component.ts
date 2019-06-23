import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  location = '';

  constructor(private router: Router) {}

  routeTo(component){
    this.router.navigate([component]);
  }
  
    onKey(event: any) { // without type info
      this.location += event.target.value + ' | ';
    }

  ngOnInit() {
  }

}
