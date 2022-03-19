import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProgressService } from './user-progress.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  curUserId: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
  ]);

  userdisplayName = new FormControl('', [Validators.required]);

  constructor(
    public fireauth: AngularFireAuth,
    public firebase: FirebaseApp,
    public angularfire: AngularFirestore,
    public router: Router,
    public userProgress: UserProgressService,
    public userService: UserProgressService,
    public ngZone: NgZone) {

    // this.fireauth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }

  //login method
  login(email: string, password: string) {
    this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        localStorage.setItem('token', 'true');
        this.userOnline(result.user?.uid);
        this.curUserId = result.user?.uid;
        this.router.navigate(['navbar/' + this.curUserId]);

      }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  userOnline(uid: any) {
    var db = this.firebase.firestore();

    db.collection('users').doc(uid).update({ online: true });
  }

  // register method
  register(email: string, password: string, displayName: string): void {
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        alert('Registration Successful');

        this.sendEmailForVarification(res.user);
        this.SetUserData(res.user, displayName);
        this.router.navigate(['/login']);



      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
  }




  SetUserData(user: any, displayName: string) {
    const userRef: AngularFirestoreDocument<any> =
      this.angularfire.doc(`users/${user.uid}`
      );
    const userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: displayName,
      photoURL: 'assets/icons/user.png',
      online: false,
      status: '',
      privatChat: [],

    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  // sign out
  logout() {
    this.fireauth.signOut()
      .then(() => {
        this.userProgress.user.online = false;
        this.userProgress.saveUserData();
        localStorage.removeItem('user');
        this.fireauth.signOut();
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
      })
  }




  // forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }


  // email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }


}




function of(arg0: null): any {
  throw new Error('Function not implemented.');
}

