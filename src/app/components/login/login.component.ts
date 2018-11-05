import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegService } from '../../services/reg.service';
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
  constructor(private route:Router, private mySvc:RegService) { }
  ngOnInit() {
  }

  processForm(theForm:NgForm) {
    console.log(theForm.value);
    this.myList.push(theForm.value);
    
    this.mySvc.addUser(theForm.value)
     .subscribe((result:any)=>{
       console.log(result);
     });
    this.route.navigate(['/Profile']);
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
