import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    // Send the form data to your backend API
    this.http.post('http://localhost:8080/email/contact-us', this.formData)
      .subscribe(
        () => {
          console.log('Message sent successfully');
          this.formData = {
            name: '',
            email: '',
            subject: '',
            message: ''
          };
          alert("Thank You For Contacting Us....!");
          // You can display a success message or redirect the user to a thank you page
        },
        error => {
          console.error('Error sending message:', error);
          // You can display an error message to the user
        }
      );
  }
}
