import { Component, OnInit,inject} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { BookingDialogComponent } from 'src/app/booking-dialog/booking-dialog.component';
import { DeleteDialogService } from 'src/app/delete-dialog.service';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { TripServiceService } from 'src/app/services/trip-service.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})

export class PackageComponent implements OnInit {
  logginUser!:any

  displayedColumns: string[] = ['Name', 'Address', 'Price','Book'];
  dataSource!:MatTableDataSource<any>;
  constructor(private router: Router,private tripService:TripServiceService, private dialog:MatDialog,
    private dialogService:DeleteDialogService) { }

  ngOnInit(): void {
    this.getAllLocation();
  }

  getAllLocation(){
    this.tripService.getAllProperties().subscribe(
      {next:(data)=>{this.dataSource = new MatTableDataSource(data);
        console.log(data);
      },error:(err)=>{
          console.log('httperror: ');
          console.log(err);
      }
  });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 // send location details data to booking bialog component
    openDialog(row:Event): void {
      const dialogRef = this.dialog.open(BookingDialogComponent, {
        width:'10000px',
        data:row
        });

  }

    //for login user
    loggedinUser(){
      this.logginUser =JSON.parse(localStorage.getItem('userdata')as string);
      return this.logginUser;
    }

  // delete booking for admin
  deletePackage(id:any){
    this.dialogService.openConformDialog()
    .afterClosed().subscribe(value=>{
      if(value){
        this.tripService.deleteTripDetails(id).subscribe(res=>{
          alert("Delete Successfully!!");
          this.getAllLocation();
        },err=>{
          alert('Somthing in wrong')
        });
      }
    });

  }



}
