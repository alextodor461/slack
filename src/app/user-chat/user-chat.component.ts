
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'models/users.class';
import { Message } from 'models/message.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DATE_PIPE_DEFAULT_TIMEZONE, getLocaleTimeFormat } from '@angular/common';

//var today = new Date();
//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
  allUsers: any = [];
  url: string = '';
  constructor(public firestore: AngularFirestore,
    private route: ActivatedRoute,
    public fireauth: AngularFireAuth,
    private router: Router) {
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
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges({ idField: 'customIdUser' })
      .subscribe((current: any) => {
        console.log('Current User from DB', current);
        this.allUsers = current;
      });
  }

  selectFile(event: any){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) =>{
        this.url = event.target.result;
      }
    }
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
    var minutes = new Date().getMinutes();
    this.message.sentAt = new Date().getHours() + ":" + minutes;
    this.firestore
      .collection('messages')
      .add(this.message.toJSON())
      .then((results) => {
        console.log(results);
        this.message.post = ' ';
      })
  }
}

