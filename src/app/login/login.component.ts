import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userdata: any;
  constructor(private fb : FormBuilder, private toastr : ToastrService, private service : AuthService, private router : Router){}

  loginForm = this.fb.group ({
    username : this.fb.control('',Validators.required),
    password : this.fb.control('',Validators.required)
  })

  proceedlogin(){
    console.log(this.loginForm)
    if(this.loginForm.valid){
      this.service.getByCode(this.loginForm.value.username).subscribe(res=>{
        this.userdata = res;
        console.log(this.userdata);
        if(this.userdata.password === this.loginForm.value.password){
            localStorage.setItem('username', this.userdata.username)
            localStorage.setItem('name', this.userdata.name)
            localStorage.setItem('userrole', this.userdata.role)
            localStorage.setItem('dept', this.userdata.dept)
            localStorage.setItem('uuid', this.userdata.uuid)
            if(this.userdata.role === 'hod'){
              this.router.navigate(['/hod']);
            }else{
              this.router.navigate(['/staff']);
            }
            
        }else{
          this.toastr.error('Invalid credentials');
        }
      })
    }
  }
}
