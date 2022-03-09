import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { ChatComponent } from './chat/chat.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { ThreadsComponent } from './threads/threads.component';
import { UserChatComponent } from './user-chat/user-chat.component';

import { VarifyEmailComponent } from './varify-email/varify-email.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent,
  children: [
    {
      path: 'chat/:id',
      component: ChatComponent
    },
    {
      path: 'user-chat/:id',
      component: UserChatComponent
    },
    {
        path: 'threads',
        component: ThreadsComponent
    },
    ]},
  { path: 'user/:id', component: NavbarComponent },
  { path: 'channel/:id', component: NavbarComponent,
   children: [
    {
        path: 'threads',
        component: ThreadsComponent
    },
    {
      path: 'chat/:id',
      component: ChatComponent
    },]},
  { path: 'register', component: RegisterComponent },
  { path: 'varify-email', component: VarifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
