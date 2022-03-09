
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActivatedRoute } from '@angular/router';
import { User } from 'models/users.class';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {
  userId: any = '';
  user: User = new User();
  message: any = '';
  allChannels: any = [];
  messageText: any;
  constructor(public firestore: AngularFirestore, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('Got ID', this.userId);
      this.getUser();
    })
  }
  getUser() {
    this.firestore.collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
      })
  }
  //getMessage() {
    //this.firestore
      //.collection('users')
      //.doc(this.userId)
      //.valueChanges()
      //.subscribe((channel: any) => {
        //this.channel = new Channel(channel);
      //})
  //}


  send() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update({ message: this.messageText.toJSON() })
      .then((results) => {
        console.log(results);

      })
  }
}
