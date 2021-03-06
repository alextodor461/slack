import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/shared/message.service';
import { UserProgressService } from 'app/shared/user-progress.service';
import { Channel } from 'models/channels.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  channelId: any = '';
  channel: Channel = new Channel();
  constructor(
    public firestore: AngularFirestore,
    public route: ActivatedRoute,
    public userService: UserProgressService,
    public messageService: MessageService
    ) { }
 
  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelId = paramMap.get('id');
      console.log('Got ID', this.channelId);
      this.getChannel();
  })
  }

  getChannel(){
    this.firestore.collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((channel: any) =>{
    this.channel = new Channel(channel);
    })
  }
}
