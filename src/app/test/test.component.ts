import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less'],
})
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  send() {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        new Notification('⏰ 时间到！', {
          icon: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500&auto=format',
          body: '第二个番茄',
        });
      }
    });
  }
}
