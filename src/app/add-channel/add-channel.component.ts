import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'models/channels.class';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent implements OnInit {
  channel = new Channel();

  constructor(public dialogRef: MatDialogRef<AddChannelComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  save(){
    this.firestore.collection('channels').add(this.channel.toJSON()).then((results) => {
      console.log(results);
      this.dialogRef.close();
    })
  }
}
