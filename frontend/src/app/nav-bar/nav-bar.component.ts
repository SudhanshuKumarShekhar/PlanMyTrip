import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  logginUser!:any
  loginDialog:boolean=false;

  constructor(private router:Router) { }
  ngOnInit(): void {
  }


//for login user
  loggedin(){
    this.logginUser =JSON.parse(localStorage.getItem('userdata')as string);
    return this.logginUser;
  }

  onlogout(){
    this.router.navigate(['/']);
   return localStorage.removeItem('userdata');
  }

//dialog bar for userlogin details
profileOpen(){
  this.loginDialog=true;
}
    profileClose(){
      this.loginDialog=false;

    }
}
