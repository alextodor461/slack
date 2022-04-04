import { Component,
         OnInit,
         ViewChild,
         ViewChildren,
         QueryList } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'models/users.class';
import { Message } from 'models/message.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CloudstorageService } from 'app/shared/cloudstorage.service';
import { MessageService } from 'app/shared/message.service';
import { UserProgressService } from 'app/shared/user-progress.service';
import { Location } from '@angular/common';
import { DATE_PIPE_DEFAULT_TIMEZONE, getLocaleTimeFormat } from '@angular/common';

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {
  public get location(): Location {
    return this._location;
  }
  public set location(value: Location) {
    this._location = value;
  }


  message = new Message();
  threadIndex: number | undefined;
  currentlocation: any;
  formatText: boolean;
  privateChatData: any;
  text: any = '';
  userId: any = '';
  user: User = new User();
  allChannels: any = [];
  allMessages: any = [];
  allUser: any = [];
  messageId: any;
  hoverIndexThreadIcon: number = -1;
  hoverIndexChatImageIcon: number = -1;

  today = new Date();
  time = today.getHours() + ":" + today.getMinutes();
  

  @ViewChildren('messages')
  messages!: QueryList<any>;
  @ViewChild('inputText') inputText: any;
  
  //@ViewChild('scrollEnd');
 

  url: string = '';
  constructor(public firestore: AngularFirestore,
    private route: ActivatedRoute,
    public cloudstorageService: CloudstorageService,
    public fireauth: AngularFireAuth,
    public messageService: MessageService,
    private _location: Location,

    public userService: UserProgressService,
    private router: Router) {
      this.formatText = false;
  }
  
  ngOnInit(){

    this.currentlocation = this.messageService.loadCurrentChatroom();

    this.route.params.subscribe((params) => {
      this.messageId = params['id'];
      this.messageService.loadCurrentMessage(params['id'], this.currentlocation);

      if (this.currentlocation == 'messages' && this.userService.user) {
        this.privateChatData = this.returnUserData(
          this.filterPrivateChatUser(params['id'])[0].userUID
        );
      }
      
    });
  }

  filterPrivateChatUser(params: any) {
    let chatData = this.userService.user.privateChat.filter(
      (privateChat: any) => privateChat.messageId == params
    );

    return chatData;
  }

  send() {
    if (
      (this.text && this.cloudstorageService.imageURL.length <= 0) ||
      this.checkUploadAllImages()
    ) {
      let date = new Date();
      let getTime = date.getHours() + ':' + date.getMinutes();

      if (this.isThreadRoute() && this.threadIndex) {
        this.threadMessage(getTime, this.threadIndex);
      } else {
        this.chatMessage(getTime);
      }
      this.resetChat();
    }
  }

  threadMessage(getTime: string, threadIndex: number) {
    this.messageService.message.text[threadIndex].answer.push({
      userID: this.userService.user.uid,
      time: getTime,
      message: this.text,
      images: this.cloudstorageService.chatImages,
      codeFormat: this.formatText,
    });
  }

  chatMessage(getTime: string) {
    this.messageService.message.text.push({
      userID: this.userService.user.uid,
      time: getTime,
      message: this.text,
      images: this.cloudstorageService.chatImages,
      answer: [],
      codeFormat: this.formatText,
    });
  }

  resetChat() {
    this.formatText = false;
    this.inputText.nativeElement.value = '';
    this.text = '';
    this.cloudstorageService.chatImages = [];
    this.cloudstorageService.imageURL = [];
    this.messageService.updateCurrentMessage(this.currentlocation);
  }
  //goBack() {
  //  this.location.back();
  //}

  onHoverChatImage(i: number) {
    this.hoverIndexChatImageIcon = i;
  }

  changeText(value: string) {
    let replaceValue = value.replace(/^(.)|(.)$/g, '');

    if (value.includes('`' + replaceValue + '`') && replaceValue) {
      this.inputText.nativeElement.value = replaceValue;
      this.formatText = true;
      console.log(this.formatText);
    } else if (value.length <= 0) {
      this.formatText = false;
    }
  }

  returnUserData(userUID: any) {
    let getUser = this.userService.allUser.filter(
      (user: { uid: any }) => user.uid == userUID
    );

    return getUser[0];
    
  }

  navigateToThread(index: number) {
    let location = this.currentlocation == 'channels' ? 'channel' : 'messages';

    this.router.navigateByUrl(
      '/navbar/' +
        this.userService.user.uid +
        '/' +
        location +
        '/' +
        this.messageId +
        '/thread/' +
        index
    );
  } 
  
  keyDownFunction(key: any) {
    if (key.code === 'Enter') {
      this.send();
    }
  }

 // openImageDialog(img: any) {
 //   this.dialog.open(DialogChatImageComponent, {
 //     data: {
 //       name: img.name,
 //       src: img.src,
 //     },
 //   });
 // }

  checkUploadAllImages() {
    for (var index in this.cloudstorageService.imageURL)
      if (this.cloudstorageService.imageURL[index].uploaded) return true;

    return false;
  }

  onHoverThread(i: number) {
    this.hoverIndexThreadIcon = i;
  }

  
  isThreadRoute() {
    return this.router.url.includes('/thread');
  }



}


    //this.firestore
    //  .collection('messages')
    //  .valueChanges()
    //  .subscribe((message: any) => {
    //    console.log('New Message', message);
    //    this.allMessages = message;
    //  })

    //this.route.paramMap.subscribe(paramMap => {
   //   this.userId = paramMap.get('id');
    //  console.log('Got ID', this.userId);
    //  this.getUser();
    //})
    //this.firestore
    //  .collection('users')
    //  .doc(this.userId)
    //  .valueChanges({ idField: 'customIdUser' })
    //  .subscribe((current: any) => {
    //    console.log('Current User from DB', current);
    //    this.allUsers = current;
    //  });
 // }
  //getUser() {
  //  this.firestore.collection('users')
  //    .doc(this.userId)
  //    .valueChanges()
  //    .subscribe((user: any) => {
  //      //this.user = new User(user);
  //    })
  //    this.time;
 // }

  //send() {
  //  this.firestore
  //    .collection('messages')
  //    .add(this.message.toJSON())
  //    .then((results) => {
  //      console.log(results);
  //      this.message.post = ' ';
  //    })
  //  console.log(time);
  //}
