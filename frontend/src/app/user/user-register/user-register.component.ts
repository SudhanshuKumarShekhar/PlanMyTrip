import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from 'src/app/Model/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerationForm!: FormGroup;
    constructor(private fb: FormBuilder,
                private authService: UserServiceService,
                private router:Router) { }

  ngOnInit(): void {
    this.createRegisterationForm();
  }
  createRegisterationForm() {
    this.registerationForm =  this.fb.group({
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(4)]],
        confirmPassword: [null, Validators.required],
        mobile: [null, [Validators.required, Validators.maxLength(10)]],
        type:['user']
    });
}

  onSubmit(){
    this.authService.registerUser(this.registerationForm.value).subscribe(res=>{
      alert("Registration Successfully!!");
      this.registerationForm.reset();
      this.router.navigate(['user/login'])
    },err=>{
      alert('Somthing in wrong')
    });
  }

}

