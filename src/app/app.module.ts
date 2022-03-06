import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { VarifyEmailComponent } from './varify-email/varify-email.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ChannelComponent } from './channel/channel.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
    AddChannelComponent,
    ChannelComponent,
    ChatComponent,

  ],

  imports: [
    //NgxAuthFirebaseUIModule.forRoot({
      //apiKey: "AIzaSyCn0uWd95vEI_dU4fmJOwYWMZuvThXDo74",
      //authDomain: "slack-clone-abf11.firebaseapp.com",
      //projectId: "slack-clone-abf11",
      //storageBucket: "slack-clone-abf11.appspot.com",
      //messagingSenderId: "336995009745",
      //appId: "1:336995009745:web:55b176f442b0a3a9c571f0"
    //}),
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    
    AngularFireModule.initializeApp(environment.config),
    FlexLayoutModule,
    MatTreeModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
