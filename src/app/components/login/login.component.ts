import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myList:any[] = [];
  minDate = new Date(1950, 0, 1);
  maxDate = new Date(2000, 0, 1);
  constructor(private route:Router, private mySvc:UserService) { }
  ngOnInit() {
  }

  processForm(theForm:NgForm) {
    console.log(theForm.value);
    this.myList.push(theForm.value);
    
    this.mySvc.loginUser(theForm.value).subscribe(
      (result:any)=>{
          console.log(result);
          this.mySvc.userId = result.user.user_id;
          this.mySvc.userEmail = result.user.email;
          this.mySvc.userName = result.user.name;
          console.log(this.mySvc.userId);
          this.route.navigate(['/Profile']);
      },
      err => {
        console.log("Invalid Email or Password");
      });
  }

  navigateToProfile() {
    this.route.navigate(['/Profile']);
  }

  navigateToRegister() {
    this.route.navigate(['/Register']);
  }

  navigateToDisplay() {
    this.route.navigate(['/Display']);
  }
  
  

}
