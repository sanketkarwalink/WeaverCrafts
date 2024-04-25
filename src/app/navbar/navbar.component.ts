import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

function nameValidator(control: FormControl): { [key: string]: any } | null {
  const valid = /^[a-zA-Z ]*$/.test(control.value);
  return valid ? null : { 'invalidName': true };
}

function pincodeValidator(control: FormControl): { [key: string]: any } | null {
  const valid = /^[0-9]*$/.test(control.value);
  return valid ? null : { 'invalidPincode': true };
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  
})
export class NavbarComponent implements OnInit {
  productcount: any;
  showforgotpass = true;
  showloggedin = true;
  showregister = true;
  showloginpage = true;
  icon = faUser;
  profileData1: any = {};
  username: any;
  searchKeyword: string = '';
  profileData: any = {};
  UserId: any;
  countproduct: any;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Declare submitted property
  submitted = false;
  
  registergrp = new FormGroup({
    name: new FormControl('', [Validators.required, nameValidator]),
    moblieno: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.minLength(6), pincodeValidator]),
    date: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  });

  loginvalid = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private sharedService: SharedService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.sharedService.sharedDataCount$.subscribe((data: any) => {
      this.productcount = data;
    });
    this.sharedService.sharedDataUserId$.subscribe((data) => {
      this.UserId = data;
    });
    this.Countporuduct(this.UserId);
  }

  onregistersubmit() {
    if (this.registergrp.valid) {
      const regis = this.registergrp.value;
      this.http.post("http://localhost:8080/addregister", regis).subscribe((resultData: any) => {
        console.log(resultData);
        alert("User registered successfully");
        this.registergrp.reset();
      });
    } else {
      alert("Please Enter Valid Details ");
      // Mark all fields as touched to display error messages
      this.markFormGroupTouched(this.registergrp);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  loggedin() {
    if (this.loginvalid.valid) {
      const loginvalue = this.loginvalid.value;
      this.http.post("http://localhost:8080/login", loginvalue).subscribe((resultData: any) => {
        if (resultData.message == "Email Not Exist") {
          alert("Email Not Exist");
        } else if (resultData.message == "Login Succes") {
          alert("User Login Succesfully ");
          var Email = loginvalue.email?.toString();
          this.SendEmail(Email);
          this.getProfiledata1(Email);
          this.sendAuthanticated(true);
          this.getProfiledata(Email);
          this.Countporuduct(this.UserId);
          // Close the login modal
          this.showloggedin = false;
          // Reset the login form
          this.loginvalid.reset();
        } else {
          alert("Incorrect Email and Password Not match");
        }
      });
    } else {
      alert("Please enter valid email and password");
    }
  }

  getProfiledata1(email: any): void {
    this.http.get(`http://localhost:8080/getemail/${email}`).subscribe((data: any) => {
      this.profileData1 = data;
      console.log(data);
      this.username = this.profileData1.name;
      console.log(this.username);
    });
  }

  SendEmail(send: any) {
    this.sharedService.setSharedDataEmail(send);
  }

  sendAuthanticated(send: boolean) {
    this.sharedService.setAuthenticationStatus(send);
  }

  sendData(SearchData: string) {
    this.sharedService.setSharedDataString(SearchData);
  }

  getProfiledata(email: any): void {
    this.http.get(`http://localhost:8080/getemail/${email}`).subscribe((data: any) => {
      this.profileData = data;
      this.SendUserId(this.profileData?.id);
      this.UserId = this.profileData?.id;
    });
  }

  SendUserId(UserId: number) {
    this.sharedService.setSharedDataUserID(UserId);
  }

  forgot() {
    this.showforgotpass = false;
  }

  signin() {
    this.showregister = false;
  }

  logpage() {
    this.showloginpage = false;
  }

  Countporuduct(UserId: number) {
    this.http.get(`http://localhost:8080/cart/cart/count/${UserId}`).subscribe((data: any) => {
      this.countproduct = data;
      console.log(data);
      this.sharedService.setSharedDatacount(this.countproduct);
    });
  }
}
