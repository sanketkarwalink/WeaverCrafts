import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

export interface Product {
  productId: number;
  productname: string;
  quantity: number;
  image: string;
  price: number;
  category: {
    categoryID: number;
    categoryname: string;
    categorytype: string;
    imagename: string;
  };
  description: string;
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit{
  
  constructor(private sharedservice:SharedService,private http:HttpClient,private router:Router){}
  ngOnInit() {
    this.sharedservice.sharedDataProductID$.subscribe((data)=>{
      this.productId=data      
    })
    this.getproductdata(this.productId);
        //Fetch Authenticated Value  
        this.sharedservice.isAuthenticated$.subscribe((data)=>{
          this.isUserLoggedin = data;
        })
            //Fetch User Id From Account Component
          this.sharedservice.sharedDataUserId$.subscribe((data)=>{
          this.UserId=data
         })
  }
  productId:any
  productdata: Product | undefined;
  Relatedproduct:any[] =[]
  getproductdata(productId:number):void {
    this.http.get(`http://localhost:8080/product/allproducts/${productId}`).subscribe((data: any) => {
      this.productdata = data;  
      this.Related(productId);
    });
  }
  Related(productId:number){
    this.http.get(`http://localhost:8080/product/exclude/${productId}`).subscribe((Data:any)=>{
      this.Relatedproduct=Data;
    })
  }
  

  
  UserId:any;
  isUserLoggedin=false;
  AddtoCart():void{
    if(this.isUserLoggedin == true)
    {
      const body ={}
      this.http.post(`http://localhost:8080/cart/add/${this.UserId}/${this.productId}`, body).subscribe((data: any) => {
        if (data.message == 'Product added to cart successfully') {
          alert('Product added to cart successfully');
        } 
      },
      (error) => {
        
        alert('Product quantity not available');
      });
    }
    else{
      alert("Please Login !!!!")
    }
  }


  //Checkout
  Checkout(){
    const body ={}
    if(this.isUserLoggedin == true){
      this.http.post(`http://localhost:8080/orders/addSingleProduct/${this.UserId}/${this.productId}`,body).subscribe((data:any)=>{
        this.router.navigate(['/checkout']);
      })

    }
    else{
      alert('Please login!!');
    }
  }
  AddtoCart1(productId:number):void{
    if(this.isUserLoggedin == true)
    {
      
     
      const body ={}
      
      this.http.post(`http://localhost:8080/cart/add/${this.UserId}/${productId}`, body).subscribe((data: any) => {
        
        if (data.message == 'Product added to cart successfully') {
          alert('Added to Cart Successfully!');
          this.Countporuduct();
        } 
      },
      (error) => {
        
        alert('Product quantity not available');
      });
    }
    else{
      alert("Please Login !!!!")
    }
  }
  sendproductId(productId:number){
    this.sharedservice.setSharedDataProductId(productId);
    this.ngOnInit();
  }
  countproduct:any
  Countporuduct(){
    this.http.get(`http://localhost:8080/cart/cart/count/${this.UserId}`).subscribe((data:any)=>{
      this.countproduct = data;
      console.log(data);
      this.sharedservice.setSharedDatacount(this.countproduct);
    });
  }

}


