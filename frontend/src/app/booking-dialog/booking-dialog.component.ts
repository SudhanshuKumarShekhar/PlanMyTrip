import { TmplAstRecursiveVisitor } from '@angular/compiler';
import {  Component,  Inject,  OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';


@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent implements OnInit {
  totalPrice:any=0;
  public closeIcon: Boolean =false;
  public conformIcon:Boolean =true;
  BookingDetailsForm!:FormGroup
  tripDetails:FormGroup = this.fb.group({
    Location:[''],
    Address:[''],
    Price:[0]
  })

  constructor(private fb:FormBuilder, private bookingService:BookingService,private router:Router,
      @Inject(MAT_DIALOG_DATA) public getTripData:any,
      private dialogRef: MatDialogRef<BookingDialogComponent>
    ) { }
  ngOnInit(): void {
    this.createBookingDetailsForm();
    if(this.getTripData){
      this.setTripData();
    }
  }
  //login user details
  logginUser =JSON.parse(localStorage.getItem('userdata')as string);
// setting data to trip dianemicaly
  setTripData(){
      this.tripDetails.controls['Location'].setValue(this.getTripData.Name);
      this.tripDetails.controls['Address'].setValue(this.getTripData.Address);
      this.tripDetails.controls['Price'].setValue(this.getTripData.Price);
  }
  createBookingDetailsForm(){
    this.BookingDetailsForm = this.fb.group({
      Name:['',Validators.required],
      Email:['', [Validators.required, Validators.email]],
      Mobile:['',Validators.required],
      Date:['',[Validators.required, Validators.maxLength(10)]],
      Person:['',Validators.required],
      LocationId:[this.getTripData.id],
      logginUserId:[this.logginUser.id],
      TotalPrice:[]
    });
  }
  goIngForConformBooking(){
    this.closeIcon = true;
    this.conformIcon=false;
  }
  backToBooking(){
    this.BookingDetailsForm.reset();
    this.totalPrice=0;
    this.closeIcon = false;
    this.conformIcon=true;
  }
onSubmit(){
  // puting price to the value
  this.totalPrice= (this.getTripData.Price)*(this.BookingDetailsForm.get('Person')?.value);
  this.BookingDetailsForm.controls['TotalPrice'].setValue(this.totalPrice);
 console.log(this.BookingDetailsForm)
}
bookingConform(){
  this.closeIcon=true;
  this.conformIcon=true;
  this.dialogRef.close();
  this.bookingService.addBookingDetails(this.BookingDetailsForm.value).subscribe(res=>{
    alert("Booking Successfully!!");
    this.BookingDetailsForm.reset();
    this.router.navigate(['/'])
  },err=>{
    alert('Somthing in wrong')
  });
  console.log(this.BookingDetailsForm)
}

}


