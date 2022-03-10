import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'app/shared/auth.service';
import { User } from 'models/users.class';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  user = new User();
  allUsers : any = [];

  constructor(private auth : AuthService, private firestore: AngularFirestore, private database: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter your Email');
      return;
    }

    if(this.password == '') {
      alert('Please enter a Password');
      return;
    }

    this.auth.register(this.email,this.password);

    this.email = '';
    this.password = '';
    this.create();
  }

  create() {
    this.firestore
    .collection('users')
      .add(this.user.toJSON())
      .then((results) => {
        console.log(results);
        
      })
  }

 
}

