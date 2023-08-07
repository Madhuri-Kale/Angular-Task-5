import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../service/leave.service';

@Component({
  selector: 'app-staff-dboard',
  templateUrl: './staff-dboard.component.html',
  styleUrls: ['./staff-dboard.component.css']
})
export class StaffDboardComponent {
  constructor(private fb : FormBuilder, private leaveService : LeaveService, private toastr : ToastrService){ }
  leaveDetailsArr : any = [];
  leaveDetails : any = this.fb.group({
    staffId : this.fb.control(''),
    name : this.fb.control(''),
    dept : this.fb.control(''),
    fromdate : this.fb.control('',Validators.required),
    todate : this.fb.control('',Validators.required),
    days : this.fb.control('',Validators.required),
    reason : this.fb.control('',Validators.required),
    status : this.fb.control('pending'),
  })

  applyLeave(){ 
    this.leaveDetails.value.staffId = this.leaveService.getUuid()
    console.log(this.leaveDetails);
    if(this.leaveDetails.valid){
      this.leaveService.proceedLeave(this.leaveDetails.value).subscribe(res =>{
        this.toastr.success('Leave applied successfully');
        this.leaveDetails.reset();
      });
    }else{
      this.toastr.warning('Please enter valid data');
    }
    
  }
}
