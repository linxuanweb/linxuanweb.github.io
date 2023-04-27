import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-openai',
  templateUrl: './openai.component.html',
  styleUrls: ['./openai.component.less'],
})
export class OpenaiComponent implements OnInit {
  answer: string;

  prompt: string;

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
      'wss://7f04-45-62-167-197.ngrok-free.app/ws/open_ai'
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
      this.ws.send(JSON.stringify({ prompt: this.prompt }));
      //   this.fetching = true;
      //   this.http
      //     .request('POST', 'https://8316-45-62-167-199.ngrok.io/open_ai/prompt', {
      //       body: {
      //         prompt: this.prompt,
      //       },
      //     })
      //     .subscribe(
      //       (data: any) => {
      //         this.answer = data.open_ai;
      //       },
      //       () => {},
      //       () => (this.fetching = false)
      //     );
    }
  }
}
