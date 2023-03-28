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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  go() {
    if (this.prompt) {
      this.fetching = true;
      this.http
        .request('POST', 'https://8316-45-62-167-199.ngrok.io/open_ai/prompt', {
          body: {
            prompt: this.prompt,
          },
        })
        .subscribe(
          (data: any) => {
            this.answer = data.open_ai;
          },
          () => {},
          () => (this.fetching = false)
        );
    }
  }
}
