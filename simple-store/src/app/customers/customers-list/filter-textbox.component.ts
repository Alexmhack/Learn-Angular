import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-textbox',
  template: `
  	Filter: <input class="form-control" type="text" [(ngModel)]="filter">
  `
})

export class FilterTextboxComponent implements OnInit {

  private _filter: string;

  @Input() get filter() {
  	return this._filter;
  }

  set filter(value: string) {
  	this._filter = value;
  	this.changed.emit(this.filter);	// Raise changed event
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }
}
