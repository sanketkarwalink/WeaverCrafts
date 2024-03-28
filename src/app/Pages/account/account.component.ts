import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  confirmationDate: string;
  modeOfPayment: string;
  address: string;
  confirmationItems: ConfirmationItem[];
  username: string;
}

interface ConfirmationItem {
  id: number;
  orderConfirmationId: number;
  productId: number;
  quantity: number;
  productImage: string;
  productname: string;
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private http: HttpClient, private sharedService: SharedService) { }
  Email: any

  ngOnInit() {
    this.sharedService.sharedDataEmail$.subscribe((Email) => {
      this.Email = Email;
      this.getProfiledata(Email)
      
    });
  }

  profileData: any = [];

  getProfiledata(email: any):void {
    this.http.get(`http://localhost:8080/getemail/${email}`).subscribe((data: any) => {
      this.profileData = data; 
      console.log(this.profileData?.id)
      this.userid=this.profileData.id
      this.SendUserId(this.profileData?.id);  
    });
  }
  SendUserId(UserId:number)
  {
    this.sharedService.setSharedDataUserID(UserId);
  }


userid:any
showorderpage = true;

  profilepage() {
    this.showaccountPage= true;
    this.showorderpage=true;
  }
  OrderedData:any[] = []
  UserOrderedData(){
    this.http.get(`http://localhost:8080/Confirm/orders/${this.userid}`).subscribe((data:any)=>{
      this.OrderedData=data;
      
      this.showorderpage = false
      this.showaccountPage=false
    })
  }
  showaccountPage = true 
  showTable: boolean = true;
  selectedOrder: Order | null = null;
  showDetails(order: Order): void {
    this.selectedOrder = order;
    this.showTable = false;
    this.showaccountPage =false;
    this.showorderpage=true
  }
  showTableSection(): void {
    this.showorderpage = false;
    this.selectedOrder = null;
  }
  
    
  
}
