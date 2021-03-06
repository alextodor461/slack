import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { MatDialogModule, MatDialogRef,  } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EditChannelComponent } from './edit-channel/edit-channel.component';
import { MatCardModule } from '@angular/material/card';
import { OnlineStatusModule } from 'ngx-online-status';
import { ThreadsComponent } from './threads/threads.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { InputChatComponent } from './input-chat/input-chat.component';
import { AuthService } from './shared/auth.service';
import { DatePipe } from '@angular/common';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { HttpClientModule } from '@angular/common/http';

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
    EditChannelComponent,
    ThreadsComponent,
    UserChatComponent,
    InputChatComponent,
    BookmarkComponent,
    
   
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    MatTreeModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatCardModule,
    OnlineStatusModule,
    ReactiveFormsModule,
    MatListModule,
    
    

  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
