// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  //For Category Id
  private sharedDataSubject = new BehaviorSubject<number>(0);
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(categoryID: number) {
    this.sharedDataSubject.next(categoryID);
  }
  //For String
  private sharedDataString = new BehaviorSubject<String>('');
  sharedDataString$ = this.sharedDataString.asObservable();

  setSharedDataString(StringData: String) {
    this.sharedDataString.next(StringData);
  }
  //For Email
  private sharedDataEmail = new BehaviorSubject<any>('');
  sharedDataEmail$ = this.sharedDataEmail.asObservable();

  setSharedDataEmail(data: any) {
    this.sharedDataEmail.next(data);
  }

  //For Login Validate
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
  private sharedDataUserId = new BehaviorSubject<number>(0);
  sharedDataUserId$ = this.sharedDataUserId.asObservable();

  setSharedDataUserID(UserId: number) {
    this.sharedDataUserId.next(UserId);
  }

  //ProductId Service For Detail Page
  private sharedDataProductId = new BehaviorSubject<number>(0);
  sharedDataProductID$ = this.sharedDataProductId.asObservable();

  setSharedDataProductId(productID: number) {
    this.sharedDataProductId.next(productID);
  }
  //OrderConfirmation Id For Order Confirm Page
  private sharedDataConfirmId = new BehaviorSubject<number>(0);
  sharedDataConfirmId$ = this.sharedDataConfirmId.asObservable();

  setSharedDataConfirmId(productID: number) {
    this.sharedDataConfirmId.next(productID);
  }
}
