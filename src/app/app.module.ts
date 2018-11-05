import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/registration/registration.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DisplayComponent } from './components/display/display.component';
import { RoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { LoanComponent } from './components/loan/loan.component';
import { ReturnComponent } from './components/return/return.component';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetComponent } from './components/reset/reset.component';
import { EditComponent } from './components/edit/edit.component';
import { ChangeComponent } from './components/change/change.component';
import { Reset2Component } from './components/reset2/reset2.component';



@NgModule({
  declarations: [
    AppComponent,
    // ReactiveFormsModule,
    RegistrationComponent,
    DisplayComponent,
    LoanComponent,
    ReturnComponent,
    LoginComponent,
    ProfileComponent,
    ResetComponent,
    EditComponent,
    ChangeComponent,
    Reset2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MaterialModule,
    FormsModule,
    MatMomentDateModule,
    RoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

