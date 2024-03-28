import { Component, OnInit,Renderer2,ElementRef } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons'

import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //Validation Of Forms
  registergrp = new FormGroup({
    name: new FormControl('',Validators.required),
    moblieno:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email:new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    address:new FormControl('',[Validators.required]),
    pincode:new FormControl('',[Validators.required,Validators.minLength(6)]),
    date:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)

  })
  loginvalid = new FormGroup({
     
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',Validators.required)
  })


//Methods of login And Registration
  onregistersubmit(){
    if(this.registergrp.valid)
    {
      const regis = this.registergrp.value;
      this.http.post("http://localhost:8080/addregister",regis).subscribe((resultData : any)=>
      { 
        console.log(resultData);
        alert("Employee registed Succesfully")
        this.registergrp.reset();
      });
    }
    else{
      alert("Please Enter Valid Details ")
    }
    console.log(this.registergrp.value)
 
    
  }

  loggedin(){
    
    const loginvalue = this.loginvalid.value;
    this.http.post("http://localhost:8080/login",loginvalue).subscribe((resultData:any)=>{

    if(resultData.message == "Email Not Exist")
    {
      alert("Email Not Exist");
    }
    else if(resultData.message =="Login Succes")
    {
        
      this.showloggedin=false
      alert("User Login Succesfully ");
      var Email = loginvalue.email?.toString();
      this.SendEmail(Email);
      this.getProfiledata1(Email);
      this.sendAuthanticated(true);
      this.getProfiledata(Email);
      
    }
    else{
      alert("Incorret Email and Password Not match");
    }
    });
  }
  modelclosed =false;
  showforgotpass=true;
  showloggedin=true;
  showregister=true;
  showloginpage=true;
  icon=faUser;
  formGroup: any;
  profileData1: any = {};
  username:any

  getProfiledata1(email: any):void {
    this.http.get(`http://localhost:8080/getemail/${email}`).subscribe((data: any) => {
      this.profileData1 = data; 
      console.log(data);
      this.username=this.profileData1.name;
      console.log(this.username)
    });
  }

  
  SendEmail(send:any){
    this.sharedService.setSharedDataEmail(send);
  }
  sendAuthanticated(send:boolean){
    this.sharedService.setAuthenticationStatus(send);
  }

  constructor(private http :HttpClient,private renderer: Renderer2, private el: ElementRef,private sharedService: SharedService){

  }

  searchKeyword: string = '';
  sendData(SearchData:string){
    this.sharedService.setSharedDataString(SearchData); 
}
profileData: any = {};

getProfiledata(email: any):void {
  this.http.get(`http://localhost:8080/getemail/${email}`).subscribe((data: any) => {
    this.profileData = data; 
    
    this.SendUserId(this.profileData?.id);  
  });
}
SendUserId(UserId:number)
{
  this.sharedService.setSharedDataUserID(UserId);
}

 
 
  forgot(){
    this.showforgotpass=false
  }
  signin(){
    this.showregister=false
  }
  logpage(){
    this.showloginpage=false
  }
  
}
