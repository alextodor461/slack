import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<ChannelComponent>, 
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.firestore
    //.collection('channels')
    //.valueChanges({idField: 'customIdName'}) 
    //.subscribe((changes: any) => {
      //console.log('Received changes from DB', changes);
      //this.allChannels = changes;
    //})
    //this.route.paramMap.subscribe( paramMap => {
      //this.channelId = paramMap.get('id');
      //console.log('Got ID', this.channelId);
    //})
  }

  saveRename() {
    this.firestore
    .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJSON())
      .then((results) => {
        console.log(results);
        this.dialogRef.close();
        
      })
  }


}


