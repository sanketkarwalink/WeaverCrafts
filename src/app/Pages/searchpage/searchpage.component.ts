import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css'
})
export class SearchpageComponent implements OnInit {
  constructor(private http: HttpClient, private sharedService: SharedService) {}
  searchKeyword: any;
  countproduct: any;
  ngOnInit() {
    this.sharedService.sharedDataString$.subscribe((searchKeyword) => {
     this.searchKeyword = searchKeyword; 
     this.searchproduct();  
     this.Countporuduct(); // Call this method to get the initial count on component load
    });
         //Fetch Authenticated Value  
    this.sharedService.isAuthenticated$.subscribe((data)=>{
      this.isUserLoggedin = data;
    });
     //
     this.sharedService.sharedDataUserId$.subscribe((data)=>{
      this.UserId=data
    });
    
  }
  searchList :any[] = [];
  resultcount:number=0;
  searchproduct(){
    this.http.get(`http://localhost:8080/product/search/${this.searchKeyword}`).subscribe((data: any) => {
      this.searchList = data;
      this.resultcount =this.searchList.length;
      console.log(this.searchList);
    });
  }

  isUserLoggedin=false;
  result:any
  UserId:any;
  AddtoCart(productId: number): void {
    if (this.isUserLoggedin == true) {
      const body = {};
      console.log(this.UserId);

      this.http.post(`http://localhost:8080/cart/add/${this.UserId}/${productId}`, body).subscribe((data: any) => {
        this.result = data;
        alert("Added to Cart Successfully !!");
        this.Countporuduct(); // Update the count after adding a product to the cart
      });
    } else {
      alert("Please Login !!!!");
    }
  }
  // Method to count the quantity of products
  Countporuduct() {
    this.http.get(`http://localhost:8080/cart/cart/count/${this.UserId}`).subscribe((data: any) => {
      this.countproduct = data;
      console.log(data);
      this.sharedService.setSharedDatacount(this.countproduct);
    });
  }

  
}
