import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegService } from '../../services/reg.service';

export interface Item {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})

export class LoanComponent implements OnInit {

  constructor(private route:Router, private mySvc:RegService) { }

  items: Item[] = [
    {value: 'item-1', viewValue: 'Tablet'},
    {value: 'item-2', viewValue: 'Notebook'},
    {value: 'item-3', viewValue: 'Cable'}
  ];

    userId : number;
    userEmail : string;
    userName : string;
    assetIn : string;

      ngOnInit() {
    this.userId = this.mySvc.userId;
    this.userEmail = this.mySvc.userEmail;
    this.userName = this.mySvc.userName;
    this.assetIn = this.mySvc.assetIn;

  }

  }
