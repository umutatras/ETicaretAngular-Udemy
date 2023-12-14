import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../../register/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:GenericHttpService) { }

  login(model:LoginModel,callBack:(res:LoginResponseModel)=>void){
    this.http.post<LoginResponseModel>("auth/login",model,res=>callBack(res));
  }


}
