import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'models/users.class';

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {

  user: User | any;
  allUser: any = [];
  loadUser: boolean = false;

  constructor(private firestore: AngularFirestore) { }

  loadUserData(paramsID: any) {
    this.user = new User();
    this.firestore
      .collection('users')
      .doc(paramsID)
      .valueChanges()
      .subscribe((currentUser: any) => {
        this.user.uid = currentUser.uid;
        this.user.email = currentUser.email;
        this.user.displayName = currentUser.displayName;
        this.user.photoURL = currentUser.photoURL;
        this.user.emailVerified = currentUser.emailVerified;
        this.user.online = true;
        this.user.status = currentUser.status;
        this.user.privateChat = currentUser.privateChat;

        this.loadUser = true;
      });
  }


   loadAllUserData() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((user) => {
        this.allUser = user;
        console.log(user);
      });
  }



  saveUserData() {
    console.log(this.user);

    this.firestore
      .collection('users')
      .doc(this.user.uid)
      .update(this.user.toJson());
  }
  

  saveOtherUser(user: any) {
    this.firestore
      .collection('users')
      .doc(user.uid)
      .update(this.OtherUserToJson(user));
  }

  OtherUserToJson(user: any) {
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      online: user.online,
      status: user.status,
      photoURL: user.photoURL,
      privateChat: user.privateChat,
    };
  }
}


