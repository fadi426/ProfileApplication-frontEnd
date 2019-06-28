import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { StoreModule } from '../../modules/store/store.module';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(private store : StoreModule) { }

  movies = [];
  
  async getMovies() {
    const resp = await fetch("https://localhost:5001/api/profile/locations/" + this.store.location._country + "/movies")
    const data = await resp.json();
    this.movies = data;
  }

  openMovieLink(url){
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.getMovies();
  }

}
