import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'app/shared/message.service';
import { Channel } from 'models/channels.class';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent implements OnInit {
  channelName: any;
  //channel = new Channel();
  //allChannels: any = [];
  constructor(
    public dialogRef: MatDialogRef<AddChannelComponent>,
     private firestore: AngularFirestore,
     public messageService: MessageService) { }

  ngOnInit(): void {


  }

  save() {
    this.messageService.createNewChannel(this.channelName);
    this.dialogRef.close();
  }

  //save() {
  //  this.firestore
  //    .collection('channels')
  //    .add(this.channel.toJSON())
  //    .then((results) => {
  //      console.log(results);
  //      
  //    })
  //}
}

