import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/shared/auth.service';
import { User } from 'models/users.class';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //displayName: string = '';
  //email: string = '';
  //password: string = '';
  //user = new User();
  //allUsers: any = [];
  //uid: string;

  constructor(
    public authService: AuthService,
    public fireauth: AngularFireAuth,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  //register() {

    //if (this.email == '') {
    //  alert('Please enter your Email');
    //  return;
   // }

    //if (this.password == '') {
    //  alert('Please enter a Password');
    //  return;
    //}

    //if (this.displayName == '') {
    //  alert('Please enter a Password');
    //  return;
}