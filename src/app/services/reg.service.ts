import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RegService {
  userId: number;
  userName: string;
  userEmail: string;
  assetIn: string;


  constructor(private http: HttpClient) { }

  getUser(userId): Observable<any> {
    return this.http.get(`http://localhost:3000/user/${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`http://localhost:3000/users`);
  }

  addUser(user: any): Observable<any> {
    console.log(">>>" + user);
    return this.http.post<any>("http://localhost:3000/user_reg", user);
  }

  selectUser(myUser: any) {

    this.userId = myUser.user_id;
    console.log ("svc user =>", this.userId);

    this.userName = myUser.name;
    console.log ("svc user =>", this.userName);

    this.userEmail = myUser.email;
    console.log ("svc user =>", this.userEmail);
  }

  removeUser(userId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/user/${userId}`);
  }

  modifyUser(user: any, userId: number ): Observable<any> {
    console.log(">>>" + user);
    return this.http.put<any>(`http://localhost:3000/user/${userId}`, user);
  }

}
  
  