import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this
      .firestore
      .collection('Nutzer')
      .valueChanges()
      .subscribe((nutzer: any) => {
        console.log('Nutzer', nutzer);
      })
  }

}
