  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { SharedService } from 'src/app/shared.service';

  @Component({
    selector: 'app-order-success',
    templateUrl: './order-success.component.html',
    styleUrl: './order-success.component.css'
  })
  export class OrderSuccessComponent implements OnInit {
    constructor(private http:HttpClient,private sharedservice:SharedService){}
    ngOnInit() {
      this.sharedservice.sharedDataConfirmId$.subscribe((data:number)=>{
        this.ConfirmOrderid=data;
        console.log(this.ConfirmOrderid)
      })
      this.OrderSuccessData()
    }
    ConfirmOrderid:number | undefined
    Orderdata:any=[]
    OrderSuccessData(){
      this.http.get(`http://localhost:8080/Confirm/${this.ConfirmOrderid}`).subscribe((data:any)=>{
        this.Orderdata=data
        console.log(this.Orderdata);
      })
    }

  }
