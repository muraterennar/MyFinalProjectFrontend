import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.createLoginFrom();
  }

  createLoginFrom() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe((response) => {
        this.toastrService.info(response.message, "Giriş Yapıldı")
        localStorage.setItem("token", response.data.token)
        console.log(response)
      }, (responseError) => {
        console.log(responseError.error)
        this.toastrService.error(responseError.error, "Bilgilerinizi Kontrol Ediniz !")
      })
    }
    else {
      this.toastrService.warning("Girilen Kişi Bulunamadı")
    }
  }

}
