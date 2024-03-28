import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

export interface OrderDetail {
  orderItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  productname: string;
  productprice: number;
  productImage: string;
}

@Component({
  selector: 'app-order',

  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent implements OnInit {
  ngOnInit() {
    //Get Login Status
    this.sharedService.isAuthenticated$.subscribe((data)=>{
      this.isUserLoggedin = data;
    });
     //Get User Id
     this.sharedService.sharedDataUserId$.subscribe((data)=>{
      this.UserId=data
    });
    //Get Email
    this.sharedService.sharedDataEmail$.subscribe((Email) => {
      this.Email = Email;
      this.getProfiledata(Email)
    });
    this.orderdetails();
    
  }

  isUserLoggedin=false;
  UserId:any
  orderDetails: OrderDetail[] = [];
  totalAmount: number = 0;

  constructor(private http :HttpClient,private router: Router,private sharedService: SharedService){}
  orderdetails(){
    this.http.get(`http://localhost:8080/orders/user/${this.UserId}`).subscribe((data:any)=>{
      this.orderDetails = data
      this.calculateTotalAmount();
      
    })
  }
  calculateTotalAmount() {
    this.totalAmount = this.orderDetails.reduce((total, order) => total + (order.quantity * order.productprice), 0);
  }

  profileData: any = {};
  Email:any
  getProfiledata(email: any):void {
    this.http.get(`http://localhost:8080/getemail/${email}`).subscribe((data: any) => {
      this.profileData = data;  
    });

  }
  

  // Confirm Order

  sendOrderId:any
  OrderConfirm(){
    const body ={}
    const orderId = this.orderDetails[0].orderId;
    console.log(orderId);
    
    this.http.post(`http://localhost:8080/Confirm/confirm-order/${orderId}/${this.UserId}/Cash`,body).subscribe((data:any)=>{
      this.sendOrderId=data;
      this.sharedService.setSharedDataConfirmId(this.sendOrderId);
      this.router.navigate(['/ConfirmOrder']);
    });
  }

  }


