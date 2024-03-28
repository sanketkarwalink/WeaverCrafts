import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit{

  constructor(private http :HttpClient,private router: Router,private sharedService: SharedService){}
  ngOnInit(): void {
    this.getFurnitureCategory();
  }

  furnitureCategory :any[] = []
    getFurnitureCategory(){
      this.http.get('http://localhost:8080/categories/Product').subscribe((data:any)=>{ 
        this.furnitureCategory=data;
        
      })
    }


    sendData(categoryID:number){
        this.sharedService.setSharedData(categoryID); 
    }


}
