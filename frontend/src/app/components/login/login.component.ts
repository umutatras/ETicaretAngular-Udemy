import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { AuthServiceService } from './services/auth-service.service';
import { LoginModel } from './models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private toastr:ToastrService,private spinner:NgxSpinnerService,private auth:AuthServiceService,private router:Router)
  {

  }

  login(loginForm:NgForm){
      if(loginForm.valid)
      {
        let model=new LoginModel();
        model.email=loginForm.controls["email"].value;
        model.password=loginForm.controls["password"].value;


        this.auth.login(model,res=>{

          this.toastr.success("Giriş başarılı");
          localStorage.setItem("token",res.token);
          localStorage.setItem("user",JSON.stringify(res.user));
          this.router.navigateByUrl("/");

        });
      }
  }
}
