import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { TripServiceService } from 'src/app/services/trip-service.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

 @ViewChild('formTabs')
  formTabs!: TabsetComponent;
 addPropertyForm!: FormGroup;

  tripView ={
    Name:'',
    Price:null,
    Address:'',
    Description:'',
    Image:''
  };
  constructor(private fb:FormBuilder,
    private tripService:TripServiceService,private router:Router) { }

  ngOnInit(): void {
    this.createAddTripForm();
  }
  url="";
  onselectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload= (event:any)=>{
        this.url= event.target.result;
      }
    }
  }
  createAddTripForm(){
    this.addPropertyForm= this.fb.group({
      Name:[null,Validators.required],
      Price:[null,Validators.required],
      Address:[null,Validators.required],
      Description:[null],
      Image:[null]
    });
  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
  onSubmit(){
    this.tripService.addTripDetails(this.addPropertyForm.value).subscribe(res=>{
      alert("Registration Successfully!!");
      this.addPropertyForm.reset();
      this.router.navigate(['/'])
    },err=>{
      alert('Somthing in wrong')
    });

  }



}
