import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
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
  status: OnlineStatusType;
  onlineStatusCheck: any = OnlineStatusType;
  OnlineStatusType = OnlineStatusType;

  channel: Channel = new Channel();
  user: User = new User();
  allChannels: any = [];
  allUsers: any = [];
  channelId: any = '';
  userId: any = '';
  form: any;
  


  constructor(public dialog: MatDialog,
    private fireauth: AngularFireAuth,
    private router: Router,
    private onlineStatusService: OnlineStatusService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute,) {
    this.dataSource.data = TREE_DATA;
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
    });
  }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log(changes);
        //this.getChannel();
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
        this.allUsers = current;
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

  //getUser() {
  //  this.firestore.collection('users')
  //    .doc(this.user.uid)
  //    .valueChanges()
  //    .subscribe((user: any) => {
  //      this.user = new User(user);
  //    })
  // }

  openDialog(): void {
    this.dialog.open(AddChannelComponent)
  }

  openChannel(): void {
    const dialog = this.dialog.open(ChannelComponent);
    dialog.componentInstance.channel = new Channel(this.channel.toJSON());
    dialog.componentInstance.channelId = this.channelId;
  }

  openChat(): void {
    this.dialog.open(ChatComponent);
    this.getChannel2();
  }

  openDialogEditChannel(): void {
    var dialog = this.dialog.open(EditChannelComponent);
    dialog.componentInstance.channel = this.channel;
  }

  deleteChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .delete()
      .then((results) => {
        console.log(results);
      })
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
}
