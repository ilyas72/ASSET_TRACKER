import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ChangePasswordService {
  userId: number;
  userName: string;
  userEmail: string;
  assetIn: string;


  constructor(private http: HttpClient) { }

  changePassword(user: any): Observable<any> {
    console.log(">>>" + user);
    return this.http.post<any>("http://localhost:3000/Change", user);
  }
}
