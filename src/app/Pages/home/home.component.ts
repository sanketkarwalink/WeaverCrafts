import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient,private sharedService:SharedService,private router:Router){}
  ngOnInit() {
    this.Random()
        //Fetch Authenticated Value  
        this.sharedService.isAuthenticated$.subscribe((data)=>{
          this.isUserLoggedin = data;
        })
        //Fetch User Id From Account Component
        this.sharedService.sharedDataUserId$.subscribe((data)=>{
          this.UserId=data
        })
    
  }
  Randomdata:any[] = []

  sendproductId(productId:number){
    this.sharedService.setSharedDataProductId(productId);
    this.router.navigate(['/detailpage']);
  }
  isUserLoggedin=false;
result:any
  UserId:any;
  AddtoCart(productId:number):void{
    if(this.isUserLoggedin == true)
    {
      
     
      const body ={}
      
      this.http.post(`http://localhost:8080/cart/add/${this.UserId}/${productId}`, body).subscribe((data: any) => {
        
        if (data.message == 'Product added to cart successfully') {
          alert('Added to Cart Successfully!');
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
  Random(){
    this.http.get('http://localhost:8080/product/random').subscribe((data:any)=>{
      this.Randomdata=data;
      console.log(data);
    })
  }
  exploremore(){
    this.ngOnInit()
  }
  

}
