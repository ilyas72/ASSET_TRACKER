import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/userdetail';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  myList:any[] = [];
  minDate = new Date(1950, 0, 1);
  maxDate = new Date(2000, 0, 1);
  constructor(private route:Router, private mySvc:UserService) { }
  
  userId : number;
  userEmail : string;
  userName : string;


  ngOnInit() {
    this.userId = this.mySvc.userId;
    this.userEmail = this.mySvc.userEmail;
    this.userName = this.mySvc.userName;

  }

//LoanItem button function --> LoanPage
  loan() {
    console.log("loan");
    
    this.route.navigate(['/Loan']);
  
  }

//ReturnItem button --> ReturnPage
  return() {
    console.log("return"); 
  
    this.route.navigate(['/Return']);
   
  }

//delete user
  deleteMe() {
    console.log("delete me ", this.userId);

    this.mySvc.removeUser(this.userId)
      .subscribe((data: any) => {
        console.log("User %s deleted.", this.userId)
      })
      
    this.route.navigate(['/Registration'])
  }

//edit user  
  processForm(theForm:NgForm){
    console.log("save me ", this.userId);

    this.mySvc.modifyUser(theForm.value, this.userId)
      .subscribe((data: any) => {
        console.log("User %s modified.", this.userId)
      })
      
    this.route.navigate(['/Registration'])
  }

  navigateToResetPassword() {
    this.route.navigate(['/Reset']);
  }

  navigateToChangePassword() {
    this.route.navigate(['/Change']);
  }

  logout() {
    this.route.navigate(['/Home']);
  }

}
 

