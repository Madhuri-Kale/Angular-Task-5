import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { LeaveService } from '../service/leave.service';

@Component({
  selector: 'app-hod-dboard',
  templateUrl: './hod-dboard.component.html',
  styleUrls: ['./hod-dboard.component.css']
})
export class HodDboardComponent implements OnInit{
  constructor(private activeRoute : ActivatedRoute, private router : Router, private leaveService : LeaveService, private service : AuthService, private http : HttpClient, private toastr : ToastrService){ }
  
  public dataid : any;
  leaveDataArr : any = [];
  leaveData : any = [];
  loggedHodDept : any = '';
  public leave : any;
  currentLeave : any = [];
  currentLeaveId : any;

  ngOnInit(): void {
    this.displayLeave();
  }
  
  displayLeave(){
    this.leaveService.getLeave().subscribe(res =>{
      this.leaveData = res;
      this.loggedHodDept = this.leaveService.getDept()
      this.leaveDataArr = this.leaveData.filter((leave : any) => leave.dept == this.loggedHodDept);
      console.log(this.leaveDataArr)
    }) 
    
  }


  onClickApprove(data:any){
  //this.isApproved = true;
  // this.activeRoute.paramMap.subscribe((param : Params) => {
  //   this.dataid = param['get']('id');
  //   console.log(this.dataid);
  //   })
    // this.service.fetchData(id).subscribe((data : any) => {
    //   this.leave = data;
    //   console.log(this.leave)
    //   this.leave.status = 'Approved';
      
      // this.service.patchLeave(this.leave.status.value).subscribe(res =>{
      //   this.toastr.success('Leave approved successfully');
        //this.router.navigate(['login']);
      // });
  //  })

  // this.leaveService.getLeave().subscribe(res =>{
  //   this.leaveData = res;
    
  // })
  this.currentLeave = this.leaveDataArr.find((leave:any) => leave.id === data.id)
    console.log(this.currentLeave);
    this.currentLeave.status = 'Approved';
    this.currentLeaveId = this.currentLeave.id;
    console.log(this.currentLeave.id);
    console.log(this.currentLeaveId);
    //this.leaveService.leaveSub.next(this.leaveService.leavesList);
    this.leaveService.updateLeave(this.currentLeaveId,this.currentLeave).subscribe((result) =>{
      console.log(result)
    })
  }

  onClickReject(data : any){
    this.currentLeave = this.leaveDataArr.find((leave:any) => leave.id === data.id)
    console.log(this.currentLeave);
    this.currentLeave.status = 'Rejected';
    this.currentLeaveId = this.currentLeave.id;
    console.log(this.currentLeaveId);
    this.leaveService.updateLeave(this.currentLeaveId,this.currentLeave).subscribe((result) =>{
      console.log(result)
    })
  }
}
