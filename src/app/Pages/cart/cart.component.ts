import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  productname: string;  
  imagename: string;
}

export interface CartData {
  cartId: number;
  userId: number;
  totalamount: number;
  cartItems: CartItem[];
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit{

  CartData: CartData[] = [{
    cartId: 0,
    userId: 0,
    totalamount: 0,
    cartItems: [
      {
        productId: 0,
        quantity: 0,
        price: 0,
        productname: '',  
        imagename: ''
      } 
    ]
}];

  constructor(private http :HttpClient,private router: Router,private sharedService: SharedService){}
  ngOnInit():void  {
    this.sharedService.isAuthenticated$.subscribe((data)=>{
      this.isUserLoggedin = data;
    });
     //
     this.sharedService.sharedDataUserId$.subscribe((data)=>{
      this.UserId=data
    });
    this.cart();
    this.Countporuduct();
  }
  isUserLoggedin=false;



  
  ProductId:any[]=[]
  UserId:any;
  //Cart Detailss
  cart(){
    this.http.get(`http://localhost:8080/cart/view/${this.UserId}`).subscribe((data:any)=>{
      this.CartData=data;
      console.log(this.CartData)
    }) 
  }
  reduceQuantity(productId:number){
    const body ={}
    this.http.post(`http://localhost:8080/cart/reduceQuantity/${this.UserId}/${productId}`,body).subscribe((data:any)=>{
    this.ngOnInit();  
  });    
  }
  Addcart(productId:number){
          const body ={}

          this.http.post(`http://localhost:8080/cart/add/${this.UserId}/${productId}`, body).subscribe((data: any) => {
            
            if (data.message == 'Product added to cart successfully') {
              this.ngOnInit()
            } 
          },
          (error) => {
            
            alert('Product quantity not available');
          });
}


  Checkout(){
    const body ={}
    
    console.log(this.CartData[0].cartId);
    if(this.isUserLoggedin == true){
      this.http.post(`http://localhost:8080/orders/place/${this.CartData[0].cartId}/${this.UserId}`,body).subscribe((data:any)=>{
        console.log(data);
        this.router.navigate(['/checkout']);
      })

    }
    else{
      alert('Please login!!');
    }
  }
  deleteItem(productId: any) {
    this.http.delete(`http://localhost:8080/cart/${this.UserId}/${productId}`).subscribe(
        () => {
            console.log('Product removed successfully');
            this.ngOnInit()
            // You can add more actions here that should happen on successful deletion
        },
        (error) => {
            console.error('Error:', error);
            // You can add more actions here that should happen if an error occurs
        }
    );
}
countproduct:any
  Countporuduct(){
    this.http.get(`http://localhost:8080/cart/cart/count/${this.UserId}`).subscribe((data:any)=>{
      this.countproduct = data;
      console.log(data);
      this.sharedService.setSharedDatacount(this.countproduct);
    });
  }

}
