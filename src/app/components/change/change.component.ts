import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordService } from '../../services/change-password.service';
import { UserDetails } from '../../models/userdetail';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {


  myList:any[] = [];
  minDate = new Date(1950, 0, 1);
  maxDate = new Date(2000, 0, 1);
  constructor(private route:Router, private mySvc:ChangePasswordService) { }
  
  userId : number;
  userEmail : string;
  userName : string;


  ngOnInit() {
    this.userId = this.mySvc.userId;
    this.userEmail = this.mySvc.userEmail;
    this.userName = this.mySvc.userName;

  }

//LoanItem button function --> LoanPage
  // loan() {
  //   console.log("loan");
    
  //   this.route.navigate(['/Loan']);
  
  // }

//ReturnItem button --> ReturnPage
  // return() {
  //   console.log("return"); 
  
  //   this.route.navigate(['/Return']);
   
  // }

//delete user
  // deleteMe() {
  //   console.log("delete me ", this.userId);

  //   this.mySvc.removeUser(this.userId)
  //     .subscribe((data: any) => {
  //       console.log("User %s deleted.", this.userId)
  //     })
      
  //   this.route.navigate(['/Registration'])
  // }

//change user  
  processForm(theForm:NgForm){
    console.log("save me ", this.userId);
    console.log(theForm.value)
    this.mySvc.changePassword(theForm.value)
      .subscribe((data: any) => {
        console.log("User password modified.")
      })
      
    this.route.navigate(['/Profile'])
  }

  // navigateToResetPassword() {
  //   this.route.navigate(['/Reset']);
  // }

  // navigateToResetPassword2() {
  //   this.route.navigate(['/Reset2']);
  // }

  // logout() {
  //   this.route.navigate(['/Home']);
  // }

}
 

