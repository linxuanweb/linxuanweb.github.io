import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-openai',
  templateUrl: './openai.component.html',
  styleUrls: ['./openai.component.less'],
})
export class OpenaiComponent implements OnInit {
  answer: string;

  prompt = `Help me write a code to generate wallet address with js.
Then you write a wallet address casually, and display it directly in your answer,`;

  fetching = false;

  ws: WebSocket;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.connectToServer().then((ws: WebSocket) => {
      this.ws = ws;
      ws.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        this.answer = parsedData.open_ai;
        if (parsedData.is_end) {
          this.fetching = false;
        }
      };
    });
  }

  connectToServer() {
    const ws = new WebSocket(
      'wss://63c6-103-116-72-172.ngrok-free.app/ws/open_ai'
    );
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer);
          resolve(ws);
        }
      }, 10);
    });
  }

  go() {
    if (this.prompt) {
      this.fetching = true;
      this.ws.send(
        JSON.stringify({
          prompt: `The below is your answer rules: 1. Your answer should be Markdown format; 2. All wallet address should be a hyperlink link;  Below is the question: ${this.prompt}`,
        })
      );
    }
  }

  test(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    // A tag
    if (e.target instanceof HTMLAnchorElement) {
      const address = e.target.href.split('/').pop();
      console.log(e.target.href);
      window.open('https://www.google.com?a=' + address, '_blank');
    }
  }

  showAddress(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    // A tag
    if (e.target instanceof HTMLAnchorElement) {
      const pathArr = e.target.href.split('/');
      let addr = '';

      pathArr.forEach((item, index) => {
        if (item.startsWith('0x')) {
          addr = item;
        }
      });

      alert('Maybe your address is: ' + addr);
    }
  }
}
