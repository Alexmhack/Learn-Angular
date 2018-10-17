import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  	<h1>{{ title }}</h1>
  	<app-customers></app-customers>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'simple-store angular app';
  title: string;

  constructor() { }

  ngOnInit() {
   	// we call a service that gives us the title
   	this.title = "simple-store angular app using";
  }
}
