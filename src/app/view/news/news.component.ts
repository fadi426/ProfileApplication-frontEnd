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
  constructor(public store :StoreModule) {  }

  news = [];

  async getLocationNews(url, province) {
    const resp = await fetch(url);
    const data = await resp.json();
    data.Articles.forEach(article => {
      if(article.UrlToImage && !this.containsArticle(article)){
        if(province)
          article.Location = this.store.location._province;
        else
          article.Location = this.store.location._name;
        this.news.push(article);
      }
    });
  }

  containsArticle(article) {
    let contain = false;
    this.news.forEach((a) => {
      if(a.Title == article.Title)
        contain =  true;
    })
    return contain;
  }

  openArticleLink(url){
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.getLocationNews('https://profileapplicationapi.azurewebsites.net/api/profile/locations/' + this.store.location._name + '%20' + this.store.location._country + '/news/', false).then(() => {
      this.getLocationNews('https://profileapplicationapi.azurewebsites.net/api/profile/locations/' + this.store.location._province + '/news/', true).then(() => {
        this.getLocationNews('https://profileapplicationapi.azurewebsites.net/api/profile/locations/' + this.store.location._province + '%20' + this.store.location._country + '/news/', true);
      })
    })
  }
}
