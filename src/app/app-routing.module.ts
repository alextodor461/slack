import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { ThreadsComponent } from './threads/threads.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { VarifyEmailComponent } from './varify-email/varify-email.component';

import { BookmarkComponent } from './bookmark/bookmark.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'navbar/:id', component: NavbarComponent,

    children: [
      {
        path: 'user-chat/:id',
        component: UserChatComponent
      },
      {
        path: 'chat/:id',
        component: UserChatComponent
      },

      {
        path: 'threads/:id',
        component: ThreadsComponent
      },
      {
        path: 'bookmark',
        component: BookmarkComponent
      },

      { path: 'channel/:id', component: UserChatComponent, }
    ]
  },
  { path: 'user/:id', component: NavbarComponent },
  {
    path: 'channel/:id', component: UserChatComponent,
    children: [
      {
        path: 'threads',
        component: ThreadsComponent
      },
      {
        path: 'chat/:id',
        component: ChatComponent
      },
      {
        path: 'user-chat/:id',
        component: UserChatComponent
      },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'varify-email', component: VarifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'bookmark', component: BookmarkComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
