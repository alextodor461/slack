
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { User } from 'models/users.class';
import { Message } from 'models/message.class';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {
 
  message = new Message();
  userId: any = '';
  user: User = new User();
  allChannels: any = [];
  allMessages: any = [];
  
  

  constructor(public firestore: AngularFirestore, public route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.firestore
      .collection('messages')
      .valueChanges()
      .subscribe((message: any) => {
        console.log('New Message', message);
        this.allMessages = message;
      })

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

 

  send() {
    this.firestore
      .collection('messages')
      .add(this.message.toJSON())
      .then((results) => {
        console.log(results);
        this.message.post=' ';
      })
  }

  

  }

