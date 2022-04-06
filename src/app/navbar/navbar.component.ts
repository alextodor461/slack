import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { AddChannelComponent } from 'app/add-channel/add-channel.component';
import { ChannelComponent } from 'app/channel/channel.component';
import { ChatComponent } from 'app/chat/chat.component';
import { EditChannelComponent } from 'app/edit-channel/edit-channel.component';
import { Channel } from 'models/channels.class';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'models/users.class';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { DatePipe } from '@angular/common';
import { UserProgressService } from 'app/shared/user-progress.service';
import { MessageService } from 'app/shared/message.service';
import { NavbarService } from 'app/shared/navbar.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'app/shared/auth.service';
import { MatDrawer} from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}
var allChannels: any = [];


const TREE_DATA: FoodNode[] = [
  {
    name: 'Channels',
    children: [allChannels]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar', { static: false }) public navbar: MatSidenav | any;
  @ViewChild(MatDrawer) matdrawer: MatDrawer;
  status: OnlineStatusType;
  onlineStatusCheck: any = OnlineStatusType;
  OnlineStatusType = OnlineStatusType;
  readTo: boolean;
  channel: Channel = new Channel();
  user: User = new User();
  allChannels: any = [];
  allUser: any = [];
  channelId: any = '';
  userId: any = '';
  form: any;



  constructor(public dialog: MatDialog,
    public userService: UserProgressService,
    public fireauth: AngularFireAuth,
    public authService: AuthService,
    public router: Router,
    public messageService: MessageService,
    public onlineStatusService: OnlineStatusService,
    public navbarService: NavbarService,
    public firestore: AngularFirestore,
    public route: ActivatedRoute,
    private observer: BreakpointObserver,) {
    this.dataSource.data = TREE_DATA;
    this.readTo = false;



  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
      if (res.matches) {
        this.matdrawer.mode = 'over';
        this.matdrawer.close();
      } else {
        this.matdrawer.mode = 'side';
        this.matdrawer.open();
      }
    });
  }

  async ngOnInit(): Promise<any> {
    await this.userService.loadAllUserData();
    await this.messageService.loadAllChannels();

    await this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.userService.loadUserData(params['id']);
    });


    //ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log(changes);
      })
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      console.log('Got ID', this.channelId);
      this.getChannel();
    })

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdUser' })
      .subscribe((current: any) => {
        console.log('Current User from DB', current);
        this.allUser = current;
      });

    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('Got ID', this.userId);
      //this.getUser();
    })
  }

  getChannel2() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
        console.log('Retrieved channel', this.channel);
      })
  }

  getChannel() {
    this.firestore.collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      })
  }

  openDialog(): void {
    this.dialog.open(AddChannelComponent)
  }



  openChat(): void {
    this.dialog.open(ChatComponent);
    this.getChannel2();
  }

  openDialogEditChannel(): void {
    var dialog = this.dialog.open(EditChannelComponent);
    dialog.componentInstance.channel = this.channel;
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.fireauth.signOut();
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  message(user: any) {
    if (this.userService.user.uid == 'guest') {
      console.log('Only Users')
    } else {
      let currentUserUID = this.userService.user.uid;
      var indexOfUserUID = user.privateChat.findIndex(function (
        item: any,
        i: any
      ) {
        return item.userUID === currentUserUID;
      });

      if (indexOfUserUID >= 0) {
        this.navigateToChat(user.privateChat[indexOfUserUID].messageid);
      } else {
        this.addMessage(user);
      }
    }
  }


  addMessage(user: any) {
    let pickedUser = {
      chatName: user.displayName,
      userUID: user.uid,
      messageid: this.userService.user.uid + user.uid,
    };
    let currentUser = {
      chatName: this.userService.user.displayName,
      userUID: this.userService.user.uid,
      messageid: this.userService.user.uid + user.uid,
    };
    this.privatMessage(pickedUser);
    this.createMessage(user, currentUser);
    this.messageService.createMessage(this.userService.user.uid + user.uid);
    this.navigateToChat(this.userService.user.uid + user.uid);
  }


  privatMessage(pickedUser: any) {
    this.userService.user.privateChat.push(pickedUser);
    this.userService.saveUserData();
  }


  createMessage(user: any, currentUser: any) {
    this.user.privateChat.push(currentUser);
    this.userService.saveOtherUser(user);
  }

  deleteChannel() {
    this.messageService.deleteChannel2();
  }



  openChannel(): void {
    const dialog = this.dialog.open(ChannelComponent);
    dialog.componentInstance.channel = new Channel(this.channel.toJSON());
    dialog.componentInstance.channelId = this.channelId;
  }

  navigateToChat(messageUID: any) {
    this.messageService.deleteCurrentChatroom();
    this.messageService.saveCurrentMessage('messages');

    this.router.navigateByUrl(
      '/navbar/' + this.userService.user.uid + '/chat/' + messageUID
    );
  }


 // this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
 //   if (res.matches) {
 //     this.matdrawer.mode = 'over';
 //     this.matdrawer.close();
 //   } else {
 //     this.matdrawer.mode = 'side';
 //     this.matdrawer.open();
 //   }
 // });


goToChannel(channel: any) {
  this.messageService.deleteCurrentChatroom();
  this.messageService.saveCurrentMessage('channels');

  this.router.navigateByUrl(
    '/navbar/' + this.userService.user.uid + '/channel/' + channel.ID
  );
  

  this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
    if (res.matches) {
      this.matdrawer.mode = 'over';
      this.matdrawer.close();
    } else {
      this.matdrawer.mode = 'side';
      this.matdrawer.open();
    }
  });
}

closeSidenav(){
  this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
    if (res.matches) {
      this.matdrawer.mode = 'over';
      this.matdrawer.close();
    } else {
      this.matdrawer.mode = 'side';
      this.matdrawer.open();
    }
  });
}

changePicture(){

}

}

