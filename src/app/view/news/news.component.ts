import { Component, OnInit } from '@angular/core';
import { StoreModule } from '../../modules/store/store.module';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor(private store :StoreModule) {  }

  news = [];

  async getNews() {
    const resp = await fetch('https://localhost:5001/api/profile/locations/' + this.store.location + '/news/');
    const data = await resp.json();
    data.Articles.forEach(article => {
      if(article.UrlToImage.length)
      this.news.push(article);
    });
    // foreach(article => {

    // });
  }

  ngOnInit() {
    this.getNews()
  }
}
