import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { LeaveService } from '../service/leave.service';

@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent implements OnInit{
  constructor(private leaveService : LeaveService, private activeroute : ActivatedRoute, private router : Router, private http : HttpClient, private toastr : ToastrService){ }
   leaveData: any  = [];
   userLeaveData: any  = [];
   currentStaffName : any;
   Id : string |undefined | null;
  
  ngOnInit(): void {
    
    this.displayLeave();
  }
  
   displayLeave(){
    this.leaveService.getLeave().subscribe(res =>{
      this.leaveData = res;
      console.log(this.leaveData);
      console.log(this.leaveService.getUuid());
      // if(this.leaveService.getUuid()=== this.leaveData.value.staffId){
      //   this.userLeaveData = this.leaveData;
      // }

      this.userLeaveData = this.leaveData.filter((leave : any) => leave.staffId === this.leaveService.getUuid());
      this.currentStaffName = this.leaveService.getName();
      if(!this.userLeaveData.length){
        this.router.navigate(['home']);
      }
    })
    

    // this.activeroute.paramMap.subscribe((param)=>{
    //   this.Id = param.get('id');
    //   if(this.Id){
    //     this.leaveService.getLeaveById(this.Id).subscribe(
    //       (leave)=>{
    //         console.log(leave);
    //         this.service.getUsers().subscribe((data)=>{
    //           console.log(data)
    //         })
    //         this.leaveData.push(leave);
    //         if(this.service.getUsers.name === this.leaveData.name){
    //           this.userLeaveData = this.leaveData;
    //         }
    //       }
    //     )
    //   }
    // })
  }

}
