import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegService } from '../../services/reg.service';
import { UserDetails } from '../../models/userdetail';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
myList:any[] = [];
minDate = new Date(1950, 0, 1);
maxDate = new Date(2000, 0, 1);
constructor(private route:Router, private mySvc:RegService) { }
  ngOnInit() {
    // this.getAllUsers();
  }  

  processForm(theForm:NgForm) {
    console.log(theForm.value);
    this.myList.push(theForm.value);
     
    this.mySvc.addUser(theForm.value)
      .subscribe((result:any)=>{
        console.log(result);
    });
    // this.getAllUsers();
    theForm.resetForm();
    this.route.navigate(['/Profile']);
  }

  // getAllUsers() {
  //   this.myList = [];
  //   this.mySvc.getAllUsers()
  //   .subscribe((data: any) => {
  //     console.log("--> ",data);
  //     data.forEach(element => {
  //       this.myList.push(element);
  //     });
  //     console.log("myList => ",this.myList)
  //   })
  // }

  // selectUser(num: any) {
  //    console.log("selected => ", this.myList[num]);
  //    this.mySvc.selectUser(this.myList[num]);
  //    this.route.navigate(['/Display']);
  // }

}
