import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LeaveService } from '../service/leave.service';

@Component({
  selector: 'app-staff-dboard',
  templateUrl: './staff-dboard.component.html',
  styleUrls: ['./staff-dboard.component.css']
})
export class StaffDboardComponent {
  constructor(private fb : FormBuilder, private router : Router, private service : AuthService, private leaveService : LeaveService, private http : HttpClient, private toastr : ToastrService){ }
  leaveDetailsArr : any = [];
  leaveDetails : any = this.fb.group({
    staffId : this.fb.control(''),
    name : this.fb.control('',Validators.required),
    dept : this.fb.control('',Validators.required),
    fromdate : this.fb.control('',Validators.required),
    todate : this.fb.control('',Validators.required),
    days : this.fb.control('',Validators.required),
    reason : this.fb.control('',Validators.required),
    status : this.fb.control('pending'),
  })

  applyLeave(){ 
    this.leaveDetails.value.staffId = this.leaveService.getUuid()
    console.log(this.leaveDetails);
    // this.leaveDetailsArr.push(this.leaveDetails);
    // this.leaveDetailsArr.push(this.leaveService.getUuid());
    // console.log(this.leaveDetailsArr);
    if(this.leaveDetails.valid){
      this.leaveService.proceedLeave(this.leaveDetails.value).subscribe(res =>{
        this.toastr.success('Leave applied successfully');
        //this.router.navigate(['login']);
      });
    }else{
      this.toastr.warning('Please enter valid data');
    }
  }
}
