import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

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

  hh = {
    message: 'do more.',
    persona: 'new_dev',
    history: [
      'what you can do',
      'Please show the latest activity of Azuki collection',
      'Help me check the most active azuki wallets in the past 24hrs',
      'Help me check the most active azuki wallets in the past 24hrs, and mark the wallet address in the response as a hyperlink.',
      'show me some js code.',
      'do more.',
    ],
    conversationId: 'fb745e2f-27f4-4f16-8fdc-70b1a18f5668',
    answer:
      "Yo, developer buddy! So, you want some JavaScript (JS) code, huh? You got it, dude! This is a basic code snippet that sets up an HTTP server using the popular Node.js framework, Express!\n\n```javascript\n// First things first, you gotta import Express\nconst express = require('express');\n\n// Now, we're gonna create an Express application. Easy peasy lemon squeezy!\nconst app = express();\n\n// All right, let's define a route handler for GET requests on the homepage ('/')\napp.get('/', (req, res) => {\n  res.send('Hello, World of Web3!');\n});\n\n// And finally, let's start our server on port 3000. Let's roll, dude!\napp.listen(3000, () => {\n  console.log('Server is live and kicking on port 3000!');\n});\n```\n\nEasy as pie, right? This code will create a super-duper local server on your machine, and it'll dance on the tune of port 3000. If you'll hit the server with a GET request to `http://localhost:3000/`, you'll get a hearty hello from the world of Web3!\n\nBefore running this, be sure you have Node.js and Express installed. If not, here's a fun line to install Express with npm, Node's package manager:\n```\nnpm install express\n```\n\nAll right, rockstar! That's a quick intro to playing with an Express server with JS. Remember, the key to coding greatness is practice, practice, and more practice! Don't forget to have fun while you're at it!\n\nTo infinity, and beyond! (I've always wanted to say that! 🚀 Code away, my friend!)",
    contract: false,
    isFooter: 'true',
    model: {
      model_id: 2,
      gpt_id: '4',
      model_name: 'GPT-4',
    },
    isRegenerated: false,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.connectToServer().then((ws: WebSocket) => {
      this.ws = ws;
      ws.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        console.log(parsedData);
        this.answer = marked(this.hh.answer);
        if (parsedData.is_end) {
          this.fetching = false;
        }
      };
    });
  }

  connectToServer() {
    const ws = new WebSocket(
      'wss://8211-103-116-72-172.ngrok-free.app/ws/open_ai'
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
}
