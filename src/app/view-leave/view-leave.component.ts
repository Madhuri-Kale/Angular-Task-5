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
export class ViewLeaveComponent implements OnInit {
  constructor(private leaveService: LeaveService, private activeroute: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService) { }
  leaveData: any = [];
  userLeaveData: any = [];
  currentStaffName: any;
  totalLeaves: number = 0;
  approvedLeaves: number = 0;
  rejectedLeaves: number = 0;
  pendingLeaves: number = 0;

  ngOnInit(): void {

    this.displayLeave();
  }

  displayLeave() {
    this.leaveService.getLeave().subscribe(res => {
      this.leaveData = res;
      console.log(this.leaveData);
      console.log(this.leaveService.getUuid());


      this.userLeaveData = this.leaveData.filter((leave: any) => leave.staffId === this.leaveService.getUuid());
      this.currentStaffName = this.leaveService.getName();
      if (!this.userLeaveData.length) {
        this.router.navigate(['home']);
      }


      this.userLeaveData.forEach((leave: any) => {
        if (leave.status === 'Approved') {
          this.approvedLeaves += leave.days * 1
        } else if (leave.status === 'Rejected') {
          this.rejectedLeaves += leave.days * 1
        } else {
          this.pendingLeaves += leave.days * 1
        }
      });
      this.totalLeaves = 20 - this.approvedLeaves;
    })

  }

}
