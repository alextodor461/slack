import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'models/channels.class';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss']
})
export class EditChannelComponent implements OnInit {
  channel: Channel;

  constructor(public dialogRef: MatDialogRef<EditChannelComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }
  
  save(){
    
  }
}
