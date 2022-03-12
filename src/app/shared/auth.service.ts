import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'models/users.class';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;


  constructor(public fireauth: AngularFireAuth, private router: Router,
     public firestore: AngularFirestore, public ngZone: NgZone ) {

    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  login(email: string, password: string) {
    return this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['navbar']);
          
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // login method
  //login(email: string, password: string) {
    //this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      //localStorage.setItem('token', 'true');
      

     // if (res.user?.emailVerified == true) {
       // this.SetUserData(res.user);
       // this.router.navigate(['navbar']);
        
      //} else {
       // this.router.navigate(['/varify-email']);
     // }

    //}, err => {
      //alert(err.message);
      //this.router.navigate(['/login']);
    //})
 // }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }


  // register method
  register(email: string, password: string,): void {
    this.fireauth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
    alert('Registration Successful');
      this.SetUserData(res.user);
      this.sendEmailForVarification(res.user);
      
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      
    };
    return userRef.set(userData, {
      merge: true,
    });
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

