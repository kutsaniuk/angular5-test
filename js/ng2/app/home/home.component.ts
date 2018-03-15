import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  tabs: Object[];
  editItem: Object[];

  constructor() {
    this.tabs = [
      {
        name: 'Start',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
      },
      {
        name: 'Middle',
        data: [3, 4, 5, 6, 7, 8, 9, 6, 3, 4, 5, 6, 7, 8, 9, 6]
      },
      {
        name: 'End',
        data: [7, 8, 9, 0, 5, 3, 2, 4, 7, 8, 9, 0, 5, 3, 2, 4]
      },
    ];
    this.editItem = [];
  }

  ngOnInit() {
    console.log('Hello Home');
  }

  onLoad = (data: any) => {
    let last = data[data.length - 1];

    for (let i = 1; i <= 8; i++) {
        data.push(last + i);
    }
  }
}
