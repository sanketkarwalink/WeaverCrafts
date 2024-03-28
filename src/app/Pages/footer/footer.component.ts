import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('scrollToTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(50%)' }))
      ])
    ])
  ]

})
export class FooterComponent {

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
