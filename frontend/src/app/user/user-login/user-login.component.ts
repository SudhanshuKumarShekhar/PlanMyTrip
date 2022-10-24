import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private router: Router,private loginService:UserServiceService,private http:HttpClient,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName:[''],
      password:['']
    })
  }
  onLogin() {
    this.http.get<any>('https://localhost:44337/api/User').subscribe(res=>{
    const member = res.find((a:any)=>{
      return (a.userName === this.loginForm.value.userName &&  a.password === this.loginForm.value.password);
    });
    if(member){
      localStorage.setItem('userdata',JSON.stringify (member));
      alert('Login Successful!!');
      this.loginForm.reset();
      this.router.navigate(['/']);
    }
    else{
      alert(' login not Successful!!');
    }
    },err=>{
      alert("somthing is wrong!!")
    })
}
}
