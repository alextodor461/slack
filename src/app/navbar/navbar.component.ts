import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit}  from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { AddChannelComponent } from 'app/add-channel/add-channel.component';
import { Channel } from 'models/channels.class';

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
    navbar =  NavbarComponent;
   channel: Channel = new Channel();
   allChannels: any = [];
   channelId: any = '';

   deleteChannel(channelId: number){
      this.allChannels.splice(channelId, 1);
      this.save();
   }

   save(){
    this.firestore.collection('channels').doc(this.channelId).update(this.channel.toJSON());
  }

  ngOnInit(): void {
    this.firestore.collection('channels').valueChanges({idField: 'customIdName'}).subscribe((changes: any) =>{
      this.allChannels = changes;
      console.log(changes);
      
    })
    this.save();
  }

  openDialog(): void {
    this.dialog.open(AddChannelComponent)
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

  constructor(public dialog: MatDialog, public firestore: AngularFirestore, public route: ActivatedRoute,) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
