import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'app/shared/auth.service';


var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

  constructor(public authService : AuthService,
     public fireauth: AngularFireAuth) { }

  ngOnInit(): void {
  };

  //login() {

    //if(this.email == '') {
    //  alert('Please enter email');
    //  return;
    //}

    //if(this.password == '') {
    //  alert('Please enter password');
    //  return;
    //}

    //this.fireauth.login(this.email,this.password);
   
    
    //this.email = '';
    //this.password = '';

  //}

}

