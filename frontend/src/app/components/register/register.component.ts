import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { Router } from '@angular/router';
import { RegisterService } from './services/register.service';
import { RegisterModel } from './models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model=new RegisterModel();
  constructor(private toastr:ToastrService,private spinner:NgxSpinnerService,private auth:RegisterService,private router:Router)
  {

  }
  register(form:NgForm)
  {
    if(form.valid)
      {
          this.auth.register(this.model,res=>{
            localStorage.setItem("token",res.token);
            localStorage.setItem("user",JSON.stringify(res.user));
            this.toastr.success("kullanici kaydı başarılı");
            this.router.navigateByUrl("/");
          })

      }
  }
}
