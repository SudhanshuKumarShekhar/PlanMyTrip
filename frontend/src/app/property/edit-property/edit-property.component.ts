import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TripServiceService } from 'src/app/services/trip-service.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  tripDetails:FormGroup = this.fb.group({
    id:[0],
    Name:[''],
    Address:[''],
    Price:[0],
    Description:['']
  })

  constructor(private fb:FormBuilder,private router:Router, private tripService:TripServiceService,
    @Inject(MAT_DIALOG_DATA) public property:any,
    private dialogRef: MatDialogRef<EditPropertyComponent>) { }

  ngOnInit(): void {
    this.getAlltripData();
    this.setTripData();
  }
  setTripData(){
    this.tripDetails.controls['id'].setValue(this.property.id);
    this.tripDetails.controls['Name'].setValue(this.property.Name);
  this.tripDetails.controls['Address'].setValue(this.property.Address);
  this.tripDetails.controls['Price'].setValue(this.property.Price);
  this.tripDetails.controls['Description'].setValue(this.property.Description);
}
// for refarace the data instantly
getAlltripData(){
  this.tripService.getAllProperties().subscribe(

  );
}
onEdit(){

  this.tripService.updateTripDetails(this.tripDetails.value).subscribe(res=>{
    this.dialogRef.close();
    alert("update Successfully!!");
    this.getAlltripData();
    this.tripDetails.reset();
  },err=>{
    alert('Somthing in wrong')
  });

}

}
