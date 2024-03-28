import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  template: `
  <!--Header-->
  <navbar></navbar>
  
  <router-outlet></router-outlet>
  

  <!--Footor-->
  <app-footer></app-footer>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'DecorMyWay';
  constructor(private spinner: NgxSpinnerService){}
  openspinner(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }
}
