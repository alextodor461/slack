import { Component, OnInit } from '@angular/core';
import { Channel } from 'models/channels.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  channel: Channel = new Channel();
  constructor() { }

  ngOnInit(): void {
  }

}
