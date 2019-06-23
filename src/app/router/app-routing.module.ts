import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../view/home/home.component';
import { WeatherComponent } from '../view/weather/weather.component';
import { NewsComponent } from '../view/news/news.component';
import { EventsComponent } from '../view/events/events.component';
import { MoviesComponent } from '../view/movies/movies.component';

const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'news', component: NewsComponent},
  {path: 'events', component: EventsComponent},
  {path: 'movies', component: MoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
