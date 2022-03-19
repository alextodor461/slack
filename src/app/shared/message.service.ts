import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Message } from 'models/message.class';
import { UserProgressService } from './user-progress.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: Message | any;
  currentMessageId: string | undefined;
  allChannels: any;
  loadMessage : boolean = false;

  constructor(
    public userService: UserProgressService,
    
    public angularfire: AngularFirestore,
    public firestore: AngularFirestore
  ) { }



  createMessage(messageUID: string) {
    const messageRef: AngularFirestoreDocument<any> =
     this.angularfire.doc(
      `messages/${messageUID}`
    );
    const messageData = {
      name: 'privateChat',
      text: [],
    };
    return messageRef.set(messageData, {
      merge: true,
    });
  }

  loadCurrentMessage(paramsID: string, messages: string) {
    this.currentMessageId = paramsID;
    this.message = new Message();
    this.firestore
      .collection(messages)
      .doc(paramsID)
      .valueChanges()
      .subscribe((message: any) => {
        console.log(message);
        this.loadMessage = true;
        this.message.name = message.name;
        this.message.text = message.text;
       
      });
  }

  saveCurrentMessage(messages: string) {
    localStorage.setItem('room', messages);
  }

  
  loadCurrentChatroom() {
    let room = localStorage.getItem('room');
    return room;
  }

  deleteCurrentChatroom() {
    localStorage.clear();
  }


  updateCurrentMessage(messages: string) {
    this.firestore
      .collection(messages)
      .doc(this.currentMessageId)
      .update(this.message.toJson());
  }

  createNewChannel(channelName: string) {
    const newID = this.angularfire.createId();

    const channelRef: AngularFirestoreDocument<any> = 
    this.angularfire
    .doc(`channels/${newID}`
    );
    const channelData = {
      name: channelName,
      ID: newID,
      text: [],
    };
    return channelRef.set(channelData, {
      merge: true,
    });
  } 

  loadAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channel) => {
        this.allChannels = channel;
      });
  }

}

