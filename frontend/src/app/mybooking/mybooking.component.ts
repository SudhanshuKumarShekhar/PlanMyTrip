import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DeleteDialogService } from '../delete-dialog.service';
import { UserForLogin } from '../Model/user';
import { BookingService } from '../services/booking.service';


@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {

  logginUser!:UserForLogin;
  locationId!:any;
  locationDetail!:any;
  displayedColumns: string[] = ['Name','Address','Name1','Mobile','Date','Person','TotalPrice','Book'];
  dataSource!:MatTableDataSource<any>;
  constructor(private BookingService:BookingService, private dialogService:DeleteDialogService) { }

  ngOnInit(): void {
    this.getAllBookinDetails();

  }

  getAllBookinDetails(){
    this.logginUser =JSON.parse(localStorage.getItem('userdata')as string);
    if(this.logginUser.type=='admin'){
      this.BookingService.getAllBooking().subscribe(
        {next:(data:any)=>{this.dataSource = new MatTableDataSource(data);
          console.log(data);
        },error:(err)=>{
            console.log('httperror: ');
            console.log(err);
        }
        });
    }
    else{
      this.BookingService.getAllBookingDetails(this.logginUser.id).subscribe(
        {next:(data:any)=>{this.dataSource = new MatTableDataSource(data);
          console.log(data);
        },error:(err)=>{
            console.log('httperror: ');
            console.log(err);
        }
        });
    }

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
// cancel booking of user
  cancelBooking(id:any){
    this.dialogService.openConformDialog()
    .afterClosed().subscribe(value=>{
      if(value){
        this.BookingService.deleteBooking(id).subscribe(res=>{
          alert("Delete Successfully!!");
          this.getAllBookinDetails();
        },err=>{
          alert('Somthing in wrong')
        });
      }
    });

  }


}
