import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../service/leave.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-hod-dboard',
  templateUrl: './hod-dboard.component.html',
  styleUrls: ['./hod-dboard.component.css']
})
export class HodDboardComponent implements OnInit{
  constructor( private leaveService : LeaveService,private service : AuthService, private toastr : ToastrService){ }
  
  public dataid : any;
  leaveDataArr : any = [];
  leaveData : any = [];
  loggedHodDept : any = '';
  public leave : any;
  currentLeave : any = [];
  currentLeaveId : any;
  registeredData : any=[];

  ngOnInit(): void {
    this.displayLeave();
  }
  
  displayLeave(){
    this.service.getAll().subscribe(res =>{
      this.registeredData = res;
    })
    
    
    this.leaveService.getLeave().subscribe(res =>{
      this.leaveData = res;
      this.leaveData.forEach((leave : any)=>{
        this.registeredData.forEach((user : any )=> {
          if(leave.staffId === user.uuid){
            leave.name = user.name;
            leave.dept = user.dept;
            this.leaveService.updateLeave(leave.id, leave).subscribe(res => {
              console.log(res)
            })
          }
        });
      })
      this.loggedHodDept = this.leaveService.getDept()
      this.leaveDataArr = this.leaveData.filter((leave : any) => leave.dept == this.loggedHodDept);
      console.log(this.leaveDataArr);
      
    }) 
    
  }


  onClickApprove(data:any){
  this.currentLeave = this.leaveDataArr.find((leave:any) => leave.id === data.id)
    console.log(this.currentLeave);
    this.currentLeave.status = 'Approved';
    this.currentLeaveId = this.currentLeave.id;
    console.log(this.currentLeave.id);
    console.log(this.currentLeaveId);
    this.leaveService.updateLeave(this.currentLeaveId,this.currentLeave).subscribe((result) =>{
      console.log(result);
      this.toastr.success('Leave approved');
    })
  }

  onClickReject(data : any){
    this.currentLeave = this.leaveDataArr.find((leave:any) => leave.id === data.id)
    console.log(this.currentLeave);
    this.currentLeave.status = 'Rejected';
    this.currentLeaveId = this.currentLeave.id;
    console.log(this.currentLeaveId);
    this.leaveService.updateLeave(this.currentLeaveId,this.currentLeave).subscribe((result) =>{
      console.log(result);
      this.toastr.success('Leave rejected');
    })
  }
}
