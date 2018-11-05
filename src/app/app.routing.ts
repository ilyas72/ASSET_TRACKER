import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { LoanComponent } from './components/loan/loan.component';
import { ReturnComponent } from './components/return/return.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetComponent } from './components/reset/reset.component';
import { EditComponent } from './components/edit/edit.component';
import { Reset2Component } from './components/reset2/reset2.component';
import { ChangeComponent } from './components/change/change.component';




const appRoutes = [
   {
       path: 'Home',
       component: LoginComponent,
   },
   {
       path: 'Display',
       component: DisplayComponent,
   },
   {
    path: 'Profile',
    component: ProfileComponent,
   },
   {
    path: 'Register',
    component: RegistrationComponent,
   },
   
   {
    path: 'Loan',
    component: LoanComponent,
   },

   {
    path: 'Return',
    component: ReturnComponent,
   },

   {
    path: 'Profile',
    component: DisplayComponent,
   },
    
   {
   path: 'Reset',
   component: ResetComponent,
  },

   {
    path: 'Reset2',
    component: Reset2Component,
   },

   {
    path: 'Edit',
    component: EditComponent,
   },

   {
    path: 'Change',
    component: ChangeComponent,
   },

   {
       path: '',
       redirectTo: '/Home',
       pathMatch: 'full'
   },

   {
       path: '**',
       component: LoginComponent,
   }
];

@NgModule({
   declarations: [

   ],
   imports: [
     BrowserModule,
     RouterModule.forRoot(appRoutes)
   ],
   exports: [ RouterModule ],
   providers: []
 })
 export class RoutingModule { }