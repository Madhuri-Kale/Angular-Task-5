import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { v4 as uuidv4 } from 'uuid'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb : FormBuilder, private toastr : ToastrService, private service : AuthService, private router : Router){}

  registerForm = this.fb.group({
    name : this.fb.control('',Validators.required),
    email : this.fb.control('',[Validators.required,Validators.email]),
    contact : this.fb.control('',Validators.required),
    dept : this.fb.control('',Validators.required),
    id : this.fb.control('',Validators.required),
    password : this.fb.control('',Validators.required),
    role : this.fb.control(''),
    leaves : this.fb.group({
      totalLeaves : this.fb.control('20'),
      approved : this.fb.control('0'),
      rejected : this.fb.control('0'),
      pending : this.fb.control('0')
    }),
    uuid : uuidv4()
  })

  proceedregisteration(){
    if(this.registerForm.valid){
      this.service.proceedregister(this.registerForm.value).subscribe(res =>{
        this.toastr.success('Please contact admin to enable access','Reistered successfully');
        this.router.navigate(['login']);
      });
    }else{
      this.toastr.warning('Please enter valid data');
    }
  }
}