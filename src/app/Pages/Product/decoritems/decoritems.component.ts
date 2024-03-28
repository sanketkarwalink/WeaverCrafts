import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-decoritems',
  templateUrl: './decoritems.component.html',
  styleUrls: ['./decoritems.component.css']
})
export class DecoritemsComponent {
  constructor(private http :HttpClient,private sharedService: SharedService){}
  ngOnInit(): void {
    this.getFurnitureCategory();
  }

  decorItemCategory :any[] = [];
    getFurnitureCategory(){
      this.http.get('http://localhost:8080/categories/decoritems').subscribe((data:any)=>{ 
        this.decorItemCategory=data;
        
      })
    }
    sendData(categoryID:number){
      this.sharedService.setSharedData(categoryID); 
  }
}
