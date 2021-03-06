import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { NewsComponent } from './view/news/news.component';
import { EventsComponent } from './view/events/events.component';
import { MoviesComponent } from './view/movies/movies.component';
import { WeatherComponent } from './view/weather/weather.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';

import { StoreModule } from './modules/store/store.module';
import { SafePipeModule } from './modules/safe-pipe/safe-pipe.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    EventsComponent,
    MoviesComponent,
    WeatherComponent,
    NavbarComponent,
    FooterComponent,
    SafePipeModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [StoreModule],
  bootstrap: [AppComponent]
})
export class AppModule {}