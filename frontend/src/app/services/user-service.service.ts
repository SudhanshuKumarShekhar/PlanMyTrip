import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserForRegister, UserForLogin } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }
  baseServerUrl= 'https://localhost:44337/api/';
  registerUser(user: UserForRegister) {
    return this.http.post(this.baseServerUrl+'User', user).pipe(map((res:any)=>{
      return res;
    }));
}
authUser(user: UserForLogin) {
  this.http.get<any>(this.baseServerUrl+'User').pipe(map((res:any)=>{
    const memder = res.find((a:any)=>{
      return (a.email=== user.userName &&  a.password=== user.password);
    })
  }));
}
}
