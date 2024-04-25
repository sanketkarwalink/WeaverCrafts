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
  selectedPaymentMethod = '';
  OrderConfirm() {
    const body = {};
    const orderId = this.orderDetails[0].orderId;
    console.log(orderId);
  
    // Check if a payment method is selected
    if (!this.selectedPaymentMethod) {
      console.error("Payment method is not selected");
      // Optionally, show a message to the user or handle the error
      alert("Please Select Mode Of Payment"); // Exit the function early if payment method is not selected
    }
  else{
    // Proceed with the POST request
    this.http.post(`http://localhost:8080/Confirm/confirm-order/${orderId}/${this.UserId}/${this.selectedPaymentMethod}`, body)
      .subscribe((data: any) => {
        this.sendOrderId = data;
        this.sharedService.setSharedDataConfirmId(this.sendOrderId);
        this.router.navigate(['/ConfirmOrder']);
      });
    }
  }
  
  storeSelectedPaymentMethod() {
    if (this.selectedPaymentMethod) {
      console.log('Selected Payment Method:', this.selectedPaymentMethod);
      // You can perform any other actions here, such as storing the selected payment method in a variable or sending it to a backend service
    } else {
      console.log('Please select a payment method.');
      // You can provide feedback to the user if no payment method is selected
    }
  }
  }


