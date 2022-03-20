import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'models/channels.class';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  allChannels = [];
  channel = new Channel();
  channelId: any = '';
  router: any;
  form: any;
  currentMessageId: string | undefined;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<ChannelComponent>, 
    public route: ActivatedRoute) { }

  ngOnInit(): void {
   
  }

  saveRename() {
    this.firestore
    .collection('channels')
      .doc(this.currentMessageId)
      .update(this.channel.toJSON())
      .then((results) => {
        console.log(results);
        this.dialogRef.close();
        
      })
  }


}


