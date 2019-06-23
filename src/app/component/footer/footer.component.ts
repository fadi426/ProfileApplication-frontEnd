import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  redirectToGithub() {
    window.location.replace('https://github.com/fadi426/ProfileApplication');
  }
  ngOnInit() {
  }

}
